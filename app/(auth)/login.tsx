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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    const { error } = await signIn(email.trim(), password);
    setLoading(false);
    if (error) Alert.alert('Connexion échouée', error.message);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1A0000', '#0D0D0D']} style={StyleSheet.absoluteFill} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.logoArea}>
            <View style={styles.logoCircle}>
              <Ionicons name="barbell" size={40} color={Colors.primary} />
            </View>
            <Text style={styles.appName}>CoachPro</Text>
            <Text style={styles.tagline}>Votre coach dans votre poche</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formTitle}>Connexion</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={18} color={Colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="votre@email.com"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mot de passe</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color={Colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={Colors.textMuted}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Button label="Se connecter" onPress={handleLogin} loading={loading} style={styles.btnMargin} />

            <TouchableOpacity
              onPress={() => router.push('/(auth)/register')}
              style={styles.registerLink}
            >
              <Text style={styles.registerText}>
                Pas encore de compte ? <Text style={styles.registerBold}>S'inscrire</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  keyboardView: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 80, paddingBottom: 40 },
  logoArea: { alignItems: 'center', marginBottom: 48 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.surface, borderWidth: 1.5,
    borderColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  appName: { color: Colors.text, fontSize: 28, fontWeight: '800', letterSpacing: 1 },
  tagline: { color: Colors.textSecondary, fontSize: 14, marginTop: 4 },
  form: {
    backgroundColor: Colors.surface, borderRadius: 20, padding: 24,
    borderWidth: 1, borderColor: Colors.border,
  },
  formTitle: { color: Colors.text, fontSize: 22, fontWeight: '700', marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { color: Colors.textSecondary, fontSize: 13, fontWeight: '600', marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surfaceElevated, borderRadius: 12,
    borderWidth: 1, borderColor: Colors.border,
    paddingHorizontal: 12,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, color: Colors.text, fontSize: 15, paddingVertical: 13 },
  eyeBtn: { padding: 4 },
  btnMargin: { marginTop: 8 },
  registerLink: { marginTop: 16, alignItems: 'center' },
  registerText: { color: Colors.textSecondary, fontSize: 14 },
  registerBold: { color: Colors.primary, fontWeight: '700' },
});
