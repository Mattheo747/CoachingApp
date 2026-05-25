import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    setLoading(true);
    const { error } = await signUp(email.trim(), password, fullName.trim());
    setLoading(false);
    if (error) {
      Alert.alert('Inscription échouée', error.message);
    } else {
      Alert.alert(
        'Compte créé !',
        'Vérifiez votre email pour confirmer votre compte.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1A0000', '#0D0D0D']} style={StyleSheet.absoluteFill} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>

          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>Rejoignez CoachPro et atteignez vos objectifs</Text>

          <View style={styles.form}>
            {[
              { label: 'Nom complet', value: fullName, set: setFullName, icon: 'person-outline', placeholder: 'Jean Dupont', type: 'default' },
              { label: 'Email', value: email, set: setEmail, icon: 'mail-outline', placeholder: 'votre@email.com', type: 'email-address' },
              { label: 'Mot de passe', value: password, set: setPassword, icon: 'lock-closed-outline', placeholder: '••••••••', type: 'default', secure: true },
            ].map(({ label, value, set, icon, placeholder, type, secure }) => (
              <View key={label} style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{label}</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name={icon as any} size={18} color={Colors.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={set}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textMuted}
                    keyboardType={type as any}
                    autoCapitalize={type === 'email-address' ? 'none' : 'words'}
                    secureTextEntry={secure}
                  />
                </View>
              </View>
            ))}

            <Button label="Créer mon compte" onPress={handleRegister} loading={loading} style={styles.btnMargin} />
          </View>

          <TouchableOpacity onPress={() => router.back()} style={styles.loginLink}>
            <Text style={styles.loginText}>
              Déjà un compte ? <Text style={styles.loginBold}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  backBtn: { marginBottom: 24 },
  title: { color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: Colors.textSecondary, fontSize: 15, marginBottom: 32 },
  form: {
    backgroundColor: Colors.surface, borderRadius: 20, padding: 24,
    borderWidth: 1, borderColor: Colors.border,
  },
  inputGroup: { marginBottom: 16 },
  inputLabel: { color: Colors.textSecondary, fontSize: 13, fontWeight: '600', marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surfaceElevated, borderRadius: 12,
    borderWidth: 1, borderColor: Colors.border, paddingHorizontal: 12,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, color: Colors.text, fontSize: 15, paddingVertical: 13 },
  btnMargin: { marginTop: 8 },
  loginLink: { marginTop: 20, alignItems: 'center' },
  loginText: { color: Colors.textSecondary, fontSize: 14 },
  loginBold: { color: Colors.primary, fontWeight: '700' },
});
