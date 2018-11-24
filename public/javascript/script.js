document.querySelector('#sitestatusdd').addEventListener('change', (e) => {
    let status = e.target.value;
    status = status.charAt(0).toUpperCase() + status.slice(1);
    window.location.href = `/sites?status=${status}`;
});