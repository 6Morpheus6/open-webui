module.exports = async (kernel) => {
  const PORT = await kernel.port()
  return {
    "daemon": true,
    "run": [{
      "method": "shell.run",
      "params": {
        "path": "app",
        "env": {
          PORT,
          HOST: "127.0.0.1"
        },
        "venv": "env",
        "message": "open-webui serve",
        "on": [{ "event": "/http://[0-9.:]+/", "done": true }]
      }
    }, {
      "method": "local.set",
      "params": {
        "url": "{{input.event[0]}}"
      }
    }]
  }
}
