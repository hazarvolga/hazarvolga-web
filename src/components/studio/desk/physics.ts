import Matter from "matter-js";
import { deskPieces, type DeskController } from "./layout";

/** A bounded, zero-gravity paper desk. Only awake objects request frames. */
export function createDesk(surface: HTMLDivElement): DeskController {
  const { Engine, Bodies, Body, Composite, Sleeping } = Matter;
  const elements = Array.from(
    surface.querySelectorAll<HTMLButtonElement>(".desk-piece"),
  );
  const engine = Engine.create({ enableSleeping: true });
  engine.gravity.x = 0;
  engine.gravity.y = 0;
  const sizes = elements.map((element) => ({
    width: element.offsetWidth,
    height: element.offsetHeight,
  }));
  const bodies = elements.map((element, index) => {
    const piece = deskPieces[index];
    const body = Bodies.rectangle(
      (surface.clientWidth * piece.x) / 100,
      (surface.clientHeight * piece.y) / 100,
      element.offsetWidth,
      element.offsetHeight,
      {
        angle: (piece.angle * Math.PI) / 180,
        frictionAir: 0.15,
        restitution: 0.12,
        sleepThreshold: 22,
      },
    );
    Body.setInertia(body, Infinity);
    Sleeping.set(body, true);
    return body;
  });
  Composite.add(engine.world, bodies);
  let active = true;
  let destroyed = false;
  let frame: number | null = null;
  let lastTime = 0;
  let drag: {
    index: number;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null = null;
  let suppressClick = false;
  let topIndex = 5;

  function constrain(index: number) {
    const body = bodies[index];
    const halfWidth = (body.bounds.max.x - body.bounds.min.x) / 2;
    const halfHeight = (body.bounds.max.y - body.bounds.min.y) / 2;
    const x = Math.max(
      halfWidth + 3,
      Math.min(surface.clientWidth - halfWidth - 3, body.position.x),
    );
    const y = Math.max(
      halfHeight + 3,
      Math.min(surface.clientHeight - halfHeight - 3, body.position.y),
    );
    if (x !== body.position.x || y !== body.position.y) {
      Body.setPosition(body, { x, y });
      Body.setVelocity(body, { x: 0, y: 0 });
    }
  }

  function paint() {
    bodies.forEach((body, index) => {
      constrain(index);
      const element = elements[index];
      element.style.left = `${body.position.x}px`;
      element.style.top = `${body.position.y}px`;
      element.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
    });
  }

  function stopFrame() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTime = 0;
    surface.dataset.running = "false";
  }

  function tick(time: number) {
    frame = null;
    if (!active || destroyed) return;
    if (!lastTime || time - lastTime >= 1000 / 60) {
      Engine.update(engine, 1000 / 60);
      paint();
      lastTime = time;
    }
    if (drag || bodies.some((body) => !body.isSleeping)) {
      frame = requestAnimationFrame(tick);
    } else {
      stopFrame();
    }
  }

  function wake() {
    if (!active || destroyed || frame !== null) return;
    surface.dataset.running = "true";
    frame = requestAnimationFrame(tick);
  }

  function wakeBodies() {
    bodies.forEach((body) => {
      if (!body.isStatic) Sleeping.set(body, false);
    });
  }

  function endDrag() {
    if (!drag) return;
    const { index, pointerId, moved } = drag;
    drag = null;
    suppressClick = moved;
    elements[index].removeAttribute("data-dragging");
    Body.setStatic(bodies[index], false);
    Body.setInertia(bodies[index], Infinity);
    Body.setVelocity(bodies[index], { x: 0, y: 0 });
    if (elements[index].hasPointerCapture(pointerId)) {
      elements[index].releasePointerCapture(pointerId);
    }
    wake();
  }

  const removers = elements.map((element, index) => {
    const body = bodies[index];
    const down = (event: PointerEvent) => {
      if (!active || event.button !== 0 || event.pointerType === "touch")
        return;
      endDrag();
      suppressClick = false;
      const bounds = surface.getBoundingClientRect();
      drag = {
        index,
        pointerId: event.pointerId,
        offsetX: event.clientX - bounds.left - body.position.x,
        offsetY: event.clientY - bounds.top - body.position.y,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
      };
      element.focus({ preventScroll: true });
      element.style.zIndex = String(++topIndex);
      element.setPointerCapture(event.pointerId);
      element.dataset.dragging = "true";
      Body.setStatic(body, true);
      wake();
    };
    const move = (event: PointerEvent) => {
      if (!drag || drag.index !== index || drag.pointerId !== event.pointerId)
        return;
      const bounds = surface.getBoundingClientRect();
      if (
        Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 4
      )
        drag.moved = true;
      Body.setPosition(body, {
        x: event.clientX - bounds.left - drag.offsetX,
        y: event.clientY - bounds.top - drag.offsetY,
      });
      // Matter skips static-vs-sleeping pairs; a carried piece must wake its neighbours.
      wakeBodies();
      constrain(index);
      paint();
      wake();
    };
    const up = (event: PointerEvent) => {
      if (drag?.pointerId === event.pointerId) endDrag();
    };
    const click = (event: MouseEvent) => {
      if (!active) return;
      if (suppressClick && event.detail !== 0) {
        suppressClick = false;
        return;
      }
      // A click/Enter moves this piece to the opposite side: no dragging needed.
      Body.setPosition(body, {
        x: surface.clientWidth - body.position.x,
        y: surface.clientHeight - body.position.y,
      });
      element.style.zIndex = String(++topIndex);
      wakeBodies();
      paint();
      wake();
    };
    const key = (event: KeyboardEvent) => {
      const directions: Record<string, readonly [number, number]> = {
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
      };
      const direction = directions[event.key];
      if (!active || !direction) return;
      event.preventDefault();
      const distance = event.shiftKey ? 24 : 8;
      Body.setPosition(body, {
        x: body.position.x + direction[0] * distance,
        y: body.position.y + direction[1] * distance,
      });
      element.style.zIndex = String(++topIndex);
      wakeBodies();
      paint();
      wake();
    };
    element.addEventListener("pointerdown", down);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerup", up);
    element.addEventListener("pointercancel", up);
    element.addEventListener("lostpointercapture", up);
    element.addEventListener("click", click);
    element.addEventListener("keydown", key);
    return () => {
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerup", up);
      element.removeEventListener("pointercancel", up);
      element.removeEventListener("lostpointercapture", up);
      element.removeEventListener("click", click);
      element.removeEventListener("keydown", key);
    };
  });

  function reset() {
    endDrag();
    bodies.forEach((body, index) => {
      const piece = deskPieces[index];
      Body.setPosition(body, {
        x: (surface.clientWidth * piece.x) / 100,
        y: (surface.clientHeight * piece.y) / 100,
      });
      Body.setAngle(body, (piece.angle * Math.PI) / 180);
      Body.setVelocity(body, { x: 0, y: 0 });
      Body.setAngularVelocity(body, 0);
      Sleeping.set(body, true);
      elements[index].style.removeProperty("z-index");
    });
    suppressClick = false;
    stopFrame();
    paint();
  }

  const blur = () => endDrag();
  window.addEventListener("blur", blur);
  paint();
  surface.dataset.running = "false";

  return {
    pause() {
      active = false;
      endDrag();
      stopFrame();
    },
    resume() {
      active = true;
      if (bodies.some((body) => !body.isSleeping)) wake();
    },
    reset,
    resize() {
      endDrag();
      bodies.forEach((body, index) => {
        const { offsetWidth: width, offsetHeight: height } = elements[index];
        if (!width || !height) return;
        // Scale in the paper's own axes; reset restores its composed angle.
        Body.setAngle(body, 0);
        Body.scale(
          body,
          width / sizes[index].width,
          height / sizes[index].height,
        );
        sizes[index] = { width, height };
        Body.setInertia(body, Infinity);
      });
      reset();
    },
    destroy() {
      destroyed = true;
      active = false;
      endDrag();
      stopFrame();
      removers.forEach((remove) => remove());
      window.removeEventListener("blur", blur);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      elements.forEach((element, index) => {
        const piece = deskPieces[index];
        element.style.left = `${piece.x}%`;
        element.style.top = `${piece.y}%`;
        element.style.transform = `translate(-50%, -50%) rotate(${piece.angle}deg)`;
        element.style.removeProperty("z-index");
      });
      delete surface.dataset.running;
    },
  };
}
