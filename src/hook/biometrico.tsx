import React, { useEffect, useState } from "react";
import { BiometryType, NativeBiometric } from "capacitor-native-biometric";
import {Preferences} from "@capacitor/preferences";

export const useBiometrico = () => {

  const [isAutenticado, setAutenticado] = useState(false);
  const [isBiometricoAvailability, setIsBiometricoAvailability] =
    useState(false);
  const [isFaceId, setIsFaceId] = useState(false);
  const [isFingerprint, setIsFingerprint] = useState(false);

  useEffect(() => {
    IsUserAndPassword().then((r) => {
      if (r) {
        setAutenticado(true);
      }
    });

    checkBiometricAvailability().then((r) => {
      setIsBiometricoAvailability(r);
    });
  }, []);

  const checkBiometricAvailability = async () => {
    const resultado = await NativeBiometric.isAvailable();
    if (resultado.isAvailable) {
      setIsFaceId(resultado.biometryType === BiometryType.FACE_ID);
      setIsFingerprint(resultado.biometryType === BiometryType.FINGERPRINT);
      return true;
    }
    return false;
  };

  const performBiometricVerification = async () => {
    const resultado = await NativeBiometric.verifyIdentity({
      reason: "Para un inicio de sesión fácil",
      title: "Iniciar Sesión",
      subtitle: "Usa Huella Digital o Face ID para continuar",
      description: "Escoge tu método de autenticación preferido",
    })
      .then(() => true)
      .catch(() => false);
    if (resultado) {
      await checkUserAndPassword();
    }
  };

  const checkUserAndPassword = async () => {
    const { username, password } = await getUserAndPassword();

    const formData = {
      username: username,
      password: password,
    };
  };

  const IsUserAndPassword = async () => {
    const { username, password } = await getUserAndPassword();
    return !(!username || !password);
  };

  const getUserAndPassword = async () => {
    const username = await Preferences.get({ key: "username" });
    const password = await Preferences.get({ key: "password" });
    return { username: username.value, password: password.value };
  };

  return {
    isAutenticado,
    isBiometricoAvailability,
    performBiometricVerification,
    setAutenticado,
  };
};
