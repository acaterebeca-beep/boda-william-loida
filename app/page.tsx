"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const fotos = [
    "/1.jpeg",
    "/2.jpeg",
    "/3.jpeg",
    "/4.jpeg",
    "/5.jpeg",
    "/6.jpeg",
    "/7.jpeg",
    "/novios.jpeg",

];

const cronograma = [
    ["2:30 PM", "INGRESO DE INVITADOS"],
    ["3:00 PM", "CEREMONIA"],
    ["4:00 PM", "FOTOGRAFÍA"],
    ["5:15 PM", "RECEPCIÓN"],
    ["5:30 PM", "INGRESO DE NOVIOS"],
    ["5:45 PM", "VALS DE NOVIOS"],
    ["6:00 PM", "BRINDIS"],
    ["7:00 PM", "CENA"],
    ["8:00 PM", "ANIMACIÓN"],
    ["9:30 PM", "RAMO"],
    ["10:00 PM", "PASTEL"],
];
function CuentaRegresiva() {
    const fecha = useMemo(
        () => new Date("2027-02-05T00:00:00-05:00").getTime(),
        []
    );

    const calcular = () => {
        const diferencia = Math.max(0, fecha - Date.now());
        return {
            dias: Math.floor(diferencia / 86400000),
            horas: Math.floor((diferencia % 86400000) / 3600000),
            minutos: Math.floor((diferencia % 3600000) / 60000),
            segundos: Math.floor((diferencia % 60000) / 1000),
        };
    };
    const [tiempo, setTiempo] = useState({
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
    });
    useEffect(() => {
        setTiempo(calcular());

        const id = window.setInterval(() => {
            setTiempo(calcular());
        }, 1000);

        return () => window.clearInterval(id);
    }, [fecha]);
    return (
        <div className="countdown">
            {[
                ["Días", tiempo.dias],
                ["Horas", String(tiempo.horas).padStart(2, "0")],
                ["Min", String(tiempo.minutos).padStart(2, "0")],
                ["Seg", String(tiempo.segundos).padStart(2, "0")],
            ].map(([label, value]) => (
                <div className="count-box" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                </div>
            ))}
        </div>
    );
}

function Galeria() {
    const [actual, setActual] = useState(0);

    useEffect(() => {
        const id = window.setInterval(
            () => setActual((n) => (n + 1) % fotos.length),
            4500
        );
        return () => window.clearInterval(id);
    }, []);

    return (
        <div className="gallery-wrap">
            <div className="gallery">
                <img src={fotos[actual]} alt={`Wiliam y Loida ${actual + 1}`} />
                <button
                    className="gallery-arrow left"
                    onClick={() =>
                        setActual((actual - 1 + fotos.length) % fotos.length)
                    }
                    aria-label="Foto anterior"
                >
                    ‹
                </button>

                <button
                    className="gallery-arrow right"
                    onClick={() =>
                        setActual((actual + 1) % fotos.length)
                    }
                    aria-label="Foto siguiente"
                >
                    ›
                </button>
            </div>
            <div className="dots">
                {fotos.map((_, i) => (
                    <button
                        key={i}
                        className={i === actual ? "dot active" : "dot"}
                        onClick={() => setActual(i)}
                        aria-label={`Ver foto ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
export default function Home() {
    const [abierta, setAbierta] = useState(false);
    const [menu, setMenu] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [musicaActiva, setMusicaActiva] = useState(false);
    useEffect(() => {
        if (abierta) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto",
            });
        }
    }, [abierta]);


    const confirmar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const nombre = String(data.get("nombre") ?? "").trim();
        const asistencia = String(data.get("asistencia") ?? "");
        const acompanado = String(data.get("acompanado") ?? "");
        const cantidadPersonas = String(
            data.get("cantidadPersonas") ?? ""
        );

        let detalleAsistencia = "";

        if (asistencia === "No podré asistir") {
            detalleAsistencia = "No podré asistir.";
        } else if (acompanado === "Sí") {
            detalleAsistencia =
                `Asistiré acompañado/a. Total de personas: ${cantidadPersonas}.`;
        } else {
            detalleAsistencia = "Asistiré sin acompañante.";
        }

        const mensaje =
            "💌 Confirmación de asistencia\n\n" +
            `Nombre: ${nombre}\n` +
            `Asistencia: ${detalleAsistencia}\n\n` +
            "William & Loida\n" +
            "05 de febrero de 2027";

        window.open(
            `https://wa.me/51950898018?text=${encodeURIComponent(mensaje)}`,
            "_blank"
        );
    };
    const [asistencia, setAsistencia] = useState("");
    const [acompanado, setAcompanado] = useState("");
    return (
        <>
            <audio
                ref={audioRef}
                src="/music/principal.mp3"
                loop
            />
            {abierta && (
                <button
                    className={`music-control ${musicaActiva ? "playing" : ""}`}
                    onClick={() => {
                        if (!audioRef.current) return;

                        if (musicaActiva) {
                            audioRef.current.pause();
                            setMusicaActiva(false);
                        } else {
                            audioRef.current.play();
                            setMusicaActiva(true);
                        }
                    }}
                    aria-label={musicaActiva ? "Pausar música" : "Reproducir música"}
                >
                    {musicaActiva ? "♫" : "♪"}
                </button>
            )}
            <main className="page">

                {!abierta && (
                    <section id="inicio" className="hero">
                        <div className="hero-cover">

                            <div className="hero-content">
                                <p className="eyebrow">Nuestra boda</p>

                                <div className="line-heart">♡</div>

                                <h1>
                                    Wiliam
                                    <span>&amp;</span>
                                    Loida
                                </h1>

                                <div className="line-heart">♡</div>

                                <p className="hero-subtitle">
                                    Nos casamos
                                </p>

                                <p className="date">
                                    05 · 02 · 2027
                                </p>

                                <button
                                    className="primary"
                                    onClick={() => {
                                        setAbierta(true);

                                        if (audioRef.current) {
                                            audioRef.current
                                                .play()
                                                .then(() => {
                                                    setMusicaActiva(true);
                                                })
                                                .catch((error) => {
                                                    console.log("No se pudo reproducir:", error);
                                                });
                                        }
                                    }}
                                >
                                    Abrir invitación
                                    <span>›</span>
                                </button>
                            </div>

                        </div>

                    </section>
                )}
                <div className={abierta ? "content visible" : "content hidden"}>
                    <section id="historia" className="section">

                        <section id="historia" className="section">
                            <div className="glass-card intro-card">
                                <div className="invitation-panel">
                                    <p className="eyebrow">Con mucha alegría</p>

                                    <h2>Nuestra boda</h2>

                                    <div className="invitation-divider">
                                        <span>♡</span>
                                    </div>

                                    <p className="invitation-intro">
                                        Tenemos el honor de invitarte a celebrar
                                        el comienzo de nuestra vida juntos.
                                    </p>

                                    <p className="invitation-names">
                                        William
                                        <span>&amp;</span>
                                        Loida
                                    </p>

                                    <p className="invitation-message">
                                        Después de un hermoso camino lleno de amor,
                                        hemos decidido unir nuestras vidas ante Dios.
                                        Nos hará muy felices compartir este día
                                        tan especial contigo.
                                    </p>

                                    <div className="invitation-date">
                                        <span>VIERNES</span>
                                        <strong>05 · 02 · 2027</strong>
                                        <span>FEBRERO DE 2027</span>
                                    </div>

                                    <p className="invitation-closing">
                                        ¡Te esperamos!
                                    </p>
                                </div>
                            </div>
                        </section>

                    </section>
                    <section className="section photo-section">
                        <div className="section-heading">
                            <p className="eyebrow">Un pedacito de nuestra historia</p>
                            <h2>RECUERDOS</h2>
                        </div>
                        <Galeria />
                    </section>

                    <section id="cronograma" className="section">

                        <div className="schedule-modern">




                            {/* CRONOGRAMA */}
                            <div className="schedule-content">

                                <p className="eyebrow" >
                                    05 · 02 · 2027
                                </p>

                                <h2>
                                    CRONOGRAMA
                                </h2>

                                <div className="schedule-line" />


                                <div className="timeline-modern">

                                    {cronograma.map(([hora, evento], i) => (

                                        <div
                                            className="timeline-modern-row"
                                            key={`${hora}-${evento}`}
                                        >

                                            <span className="modern-time">
                                                {hora}
                                            </span>

                                            <span className="modern-dot">
                                                {["✧", "❀", "♡", "✦", "❦", "✧", "♧", "❋", "♡", "❀", "✧"][i]}
                                            </span>

                                            <span className="modern-event">
                                                {evento}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </section>
                    <section className="section">
                        <div className="glass-card countdown-card">
                            <p className="eyebrow">Cada segundo cuenta</p>
                            <h3>FALTA MUY POCO</h3>
                            <CuentaRegresiva />
                        </div>
                    </section>


                    <section id="vestimenta" className="section">
                        <div className="glass-card attire-card">

                            <p className="eyebrow">
                                Para nuestro gran día
                            </p>

                            <h3>VESTIMENTA</h3>

                            <div className="attire-layout">

                                {/* Vestido blanco de referencia */}
                                <div className="attire-illustration attire-white">
                                    <img
                                        src="/vestido-blanco.png"
                                        alt="Ilustración de vestido blanco elegante"
                                    />
                                </div>

                                {/* Texto central */}
                                <div className="attire-message">
                                    <h3>¡Deseamos ver sus mejores trajes!</h3>

                                    <p>
                                        Les agradecemos evitar el uso de
                                        colores similares al blanco y rojo.
                                    </p>

                                    <div className="attire-colors">
                                        <div className="attire-color">
                                            <span
                                                className="color-circle color-white"
                                                aria-hidden="true"
                                            />
                                            <span>Blanco</span>
                                        </div>

                                        <div className="attire-color">
                                            <span
                                                className="color-circle color-red"
                                                aria-hidden="true"
                                            />
                                            <span>Rojo</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Vestido rojo de referencia */}
                                <div className="attire-illustration attire-red">
                                    <img
                                        src="/vestido-rojo.png"
                                        alt="Ilustración de vestido rojo elegante"
                                    />
                                </div>

                            </div>
                        </div>
                    </section>

                    <section id="regalos" className="section">
                        <div className="glass-card">
                            <p className="eyebrow">Un detalle de amor</p>
                            <h2>REGALOS</h2>
                            <p className="lead">
                                Tu presencia será nuestro mejor regalo.
                            </p>
                            <p>
                                Pero si desean tener un detalle con nosotros, cualquier
                                muestra de cariño será bienvenida. Si prefieres hacerlo
                                en efectivo o transferencia, tu obsequio será destinado
                                para nuestra luna de miel y a nuestro nuevo hogar.
                            </p>
                            <div className="bank">
                                <div><strong>BCP</strong><span>310-02593481-0-69</span></div>
                                <div><strong>CCI</strong><span> 00231010259348106914</span></div>
                            </div>
                        </div>
                    </section>

                    <section className="section location-section">
                        <div className="glass-card">
                            <p className="eyebrow">El gran día</p>
                            <h3>UBICACIÓN</h3>
                            <p>
                                Te esperamos para compartir juntos uno de los días
                                más importantes de nuestras vidas.
                            </p>


                            <a
                                className="primary"
                                href="https://maps.app.goo.gl/4uJKpPnUMsFZEx1j7"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ver ubicación
                            </a>
                        </div>



                    </section>
                    <section id="confirmacion" className="section final-section">
                        <div className="glass-card rsvp-card">
                            <img className="small-logo" src="/logo-wl.png" alt="" />
                            <p className="eyebrow">Queremos celebrarlo contigo</p>
                            <h3>CONFIRMA TU ASISTENCIA</h3>
                            <p>
                                Nos encantaría contar contigo en nuestra lista de invitados.
                            </p>
                            <p className="deadline">
                                Confírmanos tu asistencia hasta el <strong>10 de enero</strong>.
                            </p>


                            <form onSubmit={confirmar}>
                                <label>
                                    Nombre completo
                                    <input
                                        name="nombre"
                                        placeholder="Escribe tu nombre"
                                        required
                                    />
                                </label>

                                <label>
                                    ¿Nos acompañarás?
                                    <select
                                        name="asistencia"
                                        value={asistencia}
                                        onChange={(e) => {
                                            setAsistencia(e.target.value);
                                            setAcompanado("");
                                        }}
                                        required
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Sí, asistiré">Sí, asistiré</option>
                                        <option value="No podré asistir">
                                            No podré asistir
                                        </option>
                                    </select>
                                </label>

                                {asistencia === "Sí, asistiré" && (
                                    <>
                                        <label>
                                            ¿Vendrás acompañado/a?
                                            <select
                                                name="acompanado"
                                                value={acompanado}
                                                onChange={(e) => setAcompanado(e.target.value)}
                                                required
                                            >
                                                <option value="">Selecciona una opción</option>
                                                <option value="No">No, iré solo/a</option>
                                                <option value="Sí">Sí, iré acompañado/a</option>
                                            </select>
                                        </label>

                                        {acompanado === "Sí" && (
                                            <div className="form-group">
                                                <label htmlFor="cantidadPersonas">
                                                    Indique la cantidad
                                                </label>

                                                <select
                                                    id="cantidadPersonas"
                                                    name="cantidadPersonas"
                                                    defaultValue=""
                                                    required
                                                >
                                                    <option value="">Selecciona la cantidad</option>
                                                    <option value="2">2 personas</option>
                                                    <option value="3">3 personas</option>
                                                    <option value="4">4 personas</option>
                                                    <option value="5">5 personas</option>
                                                    <option value="6">6 personas</option>
                                                    <option value="7">7 personas</option>
                                                </select>
                                            </div>
                                        )}
                                    </>
                                )}

                                <button className="primary full" type="submit">
                                    Confirmar asistencia
                                </button>
                            </form>

                            <div className="final-date">Wiliam &amp; Loida · 05 · 02 · 2027</div>
                        </div>
                    </section>
                </div>
            </main>


        </>
    );
}
