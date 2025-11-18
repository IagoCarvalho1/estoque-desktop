#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod lib; // importa seus comandos (incluindo login_usuario)

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            lib::login_usuario  // ⬅ registre aqui
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
