import React from 'react'

export default function Login() {
    return (
        <>
            <main class="bg-login">
                <div class="login-card">
                    <h2 class="login-title">Iniciar Sesión</h2> 
                    <form>
                        <div class="input-group">
                            <label for="username" class="input-label">Usuario o Correo:</label>
                            <input type="text" class="input-field" id="username" required></input>
                        </div>
                        <div class="input-group">
                            <label for="password" class="input-label">Contraseña:</label>
                            <input type="password" class="input-field" id="password" required></input>
                        </div>
                        <button type="submit" class="submit-btn">Ingresar</button>
                    </form>
                </div>
            </main>
        </>
    )
}
