mod auth;

use tauri::Manager;
use auth::{gerar_token, validar_token};

#[tauri::command]
fn login_usuario(email: String, senha: String) -> Result<String, String> {
    if email == "admin@admin.com" && senha == "123456" {
        let token = gerar_token(&email);
        Ok(token)
    } else {
        Err("Credenciais inválidas".into())
    }
}

#[tauri::command]
fn validar_sessao(token: String) -> bool {
    validar_token(&token)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            login_usuario,
            validar_sessao
        ])
        .run(tauri::generate_context!())
        .expect("Erro ao iniciar Tauri");
}
