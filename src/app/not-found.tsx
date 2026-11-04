import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap page-section">
      <div className="page-heading">
        <h1>
          Bu sayfa yok<span className="accent">.</span>
        </h1>
        <p>Aradığınız çalışma taşınmış veya bu adres hatalı olabilir.</p>
      </div>
      <Link className="button-primary" href="/calismalar">
        Çalışmalara dön ↗
      </Link>
    </section>
  );
}
