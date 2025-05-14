async function fetchData() {
      const res = await fetch('/api/temperature');
      const { t, h, act } = await res.json();
      document.getElementById('t').innerText = t.toFixed(1);
      document.getElementById('h').innerText = h.toFixed(1);
      document.getElementById('a').innerText = act ? 'ON' : 'OFF';
    }

    async function updateSP() {
      const sp = parseFloat(document.getElementById('sp').value);
      await fetch('/api/setpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setpoint: sp })
      });
    }

    // cada 2 segundos manda a llamar la api
    setInterval(fetchData, 2000);
    fetchData();