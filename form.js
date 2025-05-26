document.getElementById("myForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const form = e.target;
    const formMessage = document.getElementById("form-message");
    const submitBtn = form.querySelector("button[type='submit']");
    
    // Estado de carga
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            formMessage.innerHTML = '<div class="success-message">✅ Mensaje enviado con éxito</div>';
            form.reset();
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        formMessage.innerHTML = '<div class="error-message">❌ Error al enviar. Por favor inténtalo de nuevo.</div>';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
        setTimeout(() => formMessage.innerHTML = "", 5000);
    }
});