import Matter from "matter-js";

export interface PhysicsObject {
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
    texture?: string;
    color?: string;
    text?: string;
    isStatic?: boolean;
}

export const createPhysicsEngine = (
    container: HTMLElement,
    currentWidth: number,
    currentHeight: number
) => {
    const Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Runner = Matter.Runner;

    // Create engine
    const engine = Engine.create();

    // Custom render
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: currentWidth,
            height: currentHeight,
            background: "transparent",
            wireframes: false,
            showAngleIndicator: false,
        },
    });

    // Create walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(currentWidth / 2, currentHeight + 50, currentWidth, 100, wallOptions);
    const leftWall = Bodies.rectangle(-50, currentHeight / 2, 100, currentHeight, wallOptions);
    const rightWall = Bodies.rectangle(currentWidth + 50, currentHeight / 2, 100, currentHeight, wallOptions);
    //   const ceiling = Bodies.rectangle(currentWidth / 2, -500, currentWidth, 100, wallOptions); // Open top for falling

    World.add(engine.world, [ground, leftWall, rightWall]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false },
        },
    });

    World.add(engine.world, mouseConstraint);

    // Allow scrolling over canvas
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    // Run the engine
    const runner = Runner.run(engine);
    Render.run(render);

    return { engine, render, runner };
};

export const createWordBody = (
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    label: string
) => {
    return Matter.Bodies.rectangle(x, y, width, height, {
        label,
        restitution: 0.6,
        friction: 0.1,
        render: {
            fillStyle: color,
            strokeStyle: "#ffffff",
            lineWidth: 2,
        },
    });
};
