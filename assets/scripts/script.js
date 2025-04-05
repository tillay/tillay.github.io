tsParticles.load("tsparticles", {
  fpsLimit: 60,
  particles: {
    number: {
      value: 400
    },
    color: {
      value: "#892EFA"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: { min: 4, max: 8 }
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: "none",
      outModes: "out"
    }
  }
});
