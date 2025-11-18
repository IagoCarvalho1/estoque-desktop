use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
use serde::{Serialize, Deserialize};
use std::time::{SystemTime, UNIX_EPOCH};

const SECRET: &[u8] = b"CHAVE_SUPER_SECRETA_AQUI";

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    exp: usize,
}

pub fn gerar_token(email: &str) -> String {
    let exp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs() + 60 * 60 * 24; // 24h

    let claims = Claims {
        sub: email.to_string(),
        exp: exp as usize,
    };

    encode(&Header::default(), &claims, &EncodingKey::from_secret(SECRET))
        .expect("Erro ao gerar token")
}

pub fn validar_token(token: &str) -> bool {
    decode::<Claims>(token,
        &DecodingKey::from_secret(SECRET),
        &Validation::default(),
    )
    .is_ok()
}
