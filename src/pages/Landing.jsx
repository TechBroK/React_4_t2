import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Landing.css'

export default function Landing() {
	const boxesRef = useRef(null)

	useEffect(() => {
		if (!boxesRef.current) return
		const el = boxesRef.current
		const boxes = Array.from(el.querySelectorAll('.box'))

		if ('IntersectionObserver' in window) {
			const io = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						el.classList.add('is-visible')
						io.unobserve(el)
					}
				})
			}, { threshold: 0.15 })
			io.observe(el)
		} else {
			el.classList.add('is-visible')
		}

		return () => {  }
	}, [])
	return (
		<>
			<main className="landing">
				<section className="hero">
					{}
					<div className="circle large" aria-hidden="true"></div>

					{}
					<div className="container hero-inner">
						<div className="hero-content">
							<h1 className="hero-title">TicketFlow</h1>
							<p className="hero-sub">
								Simple, reliable ticket management to track bugs, features, and tasks — fast and friendly.
							</p>

							<div className="hero-ctas">
								<button
									className="btn primary"
									type="button"
									onClick={() => {
										const target = document.getElementById('decorFeatureBoxes')
										if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' })
									}}
								>
									Get Started
								</button>
								<Link className="btn ghost" to="/auth/login">Login</Link>
							</div>
						</div>

						{}
					</div>

					{}
					<svg
						className="hero-wave"
						viewBox="0 0 1440 320"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<path
							fill="rgba(14,165,233,0.1)"
							d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,224C672,245,768,235,864,218.7C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
						></path>
					</svg>
				</section>

				{}
				<section className="decor-cards">
					<div className="container">
						<div ref={boxesRef} className="feature-boxes centered" id="decorFeatureBoxes">
							<div className="box">🎫 Create &amp; assign tickets</div>
							<div className="box">📊 Prioritize &amp; track progress</div>
							<div className="box">🤝 Collaborate with your team</div>
						</div>
					</div>
				</section>

				{}
				<section className="features">
					<div className="container">
						<h2>Why Choose TicketFlow?</h2>
						<div className="feature-grid">
							<div className="card">
								<h3>Fast &amp; Intuitive</h3>
								<p>Streamlined interface for managing tickets effortlessly.</p>
							</div>
							<div className="card">
								<h3>Secure Sessions</h3>
								<p>Protected routes ensure your data and tasks stay private.</p>
							</div>
							<div className="card">
								<h3>Cross-Platform</h3>
								<p>Fully responsive across desktop, tablet, and mobile devices.</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}