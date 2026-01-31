import React, { useEffect, useRef } from "react";
import "./WeatherParticles.css";

function WeatherParticles({ weatherType }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let animationFrameId;

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: Math.random() * 3 + 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      };
    };

    const createSnowParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: Math.random() * 1 + 0.5,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.6 + 0.4,
        drift: Math.random() * 0.5 - 0.25,
      };
    };

    // Initialize particles based on weather type
    if (
      weatherType === "rain" ||
      weatherType === "drizzle" ||
      weatherType === "thunderstorm"
    ) {
      for (let i = 0; i < 100; i++) {
        particles.push(createParticle());
      }
    } else if (weatherType === "snow") {
      for (let i = 0; i < 80; i++) {
        particles.push(createSnowParticle());
      }
    }

    const animateRain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x, particle.y + particle.size * 5);
        ctx.strokeStyle = `rgba(174, 194, 224, ${particle.opacity})`;
        ctx.lineWidth = particle.size / 2;
        ctx.stroke();

        particle.y += particle.speed;

        if (particle.y > canvas.height) {
          particles[index] = createParticle();
        }
      });

      animationFrameId = requestAnimationFrame(animateRain);
    };

    const animateSnow = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        particle.y += particle.speed;
        particle.x += particle.drift;

        if (particle.y > canvas.height) {
          particles[index] = createSnowParticle();
        }

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
      });

      animationFrameId = requestAnimationFrame(animateSnow);
    };

    if (
      weatherType === "rain" ||
      weatherType === "drizzle" ||
      weatherType === "thunderstorm"
    ) {
      animateRain();
    } else if (weatherType === "snow") {
      animateSnow();
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [weatherType]);

  if (!["rain", "drizzle", "thunderstorm", "snow"].includes(weatherType)) {
    return null;
  }

  return <canvas ref={canvasRef} className="weather-particles" />;
}

export default WeatherParticles;
