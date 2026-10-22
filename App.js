import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, 
  TouchableOpacity, Switch, TextInput, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


// Importamos logo de la loteria desde la carpeta assets
const LogoImage = require('./assets/LogoLoteriaDeLaCiudad.png');

const colors = {
  background: '#F8F8F8',
  surface: '#FFFFFF',
  textPrimary: '#171717',
  textSecondary: '#666666',
  border: '#CCCCCC',
  primary: '#888888',
  primaryText: '#FFFFFF',
  circlePlaceholder: '#E0E0E0',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);

  // --- COMPONENTES REUTILIZABLES ---
  // Les pasamos "goTo" para poder navegar desde los botones
  const CustomButton = ({ title, goTo, variant = 'primary', disabled }) => (
    <TouchableOpacity 
      style={[styles.button, variant === 'outline' ? styles.outlineButton : styles.primaryButton, disabled && styles.buttonDisabled]} 
      onPress={() => !disabled && goTo && goTo()}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, variant === 'outline' && { color: colors.textPrimary }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const CustomInput = ({ placeholder, secure }) => (
    <TextInput 
      style={styles.input} 
      placeholder={placeholder} 
      placeholderTextColor="#999"
      secureTextEntry={secure}
    />
  );

  const BigLogo = () => (
  <Image 
    source={LogoImage} 
    style={styles.logoImage} 
    resizeMode="contain" 
  />
);

  // --- NAVEGADOR DE PRUEBA ---
  const DevMenu = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.devMenuContainer}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17].map(num => (
        <TouchableOpacity 
          key={num} 
          style={[styles.devBtn, currentScreen === num && styles.devBtnActive]}
          onPress={() => setCurrentScreen(num)}
        >
          <Text style={{ color: currentScreen === num ? 'white' : 'black', fontWeight: 'bold' }}>P{num}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // --- PANTALLAS ---

  const Screen1 = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        <BigLogo />
        <Text style={[styles.title, { fontSize: 28, marginTop: 20 }]}>Protección digital para tu familia</Text>
        <Text style={[styles.paragraph, { fontWeight: 'bold', marginTop: 10 }]}>
          Bloquea sitios de apuestas y mantené a tus hijos seguros en internet
        </Text>
      </View>
      <View style={styles.footerAuth}>
        <CustomButton title="Iniciar sesión" variant="outline" goTo={() => setCurrentScreen(4)} />
        <CustomButton title="Registrate" variant="primary" goTo={() => setCurrentScreen(2)} />
      </View>
    </SafeAreaView>
  );

  const Screen2 = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BigLogo />
        <Text style={[styles.boldText, { textAlign: 'left', fontSize: 18, marginBottom: 15 }]}>Crear Cuenta</Text>
        <CustomInput placeholder="Nombre" />
        <CustomInput placeholder="Apellido" />
        <CustomInput placeholder="Correo electrónico" />
        <CustomInput placeholder="Contraseña" secure={true} />
        <CustomInput placeholder="Contraseña" secure={true} />
        
        <View style={styles.row}>
          <View style={styles.checkbox} />
          <Text style={styles.smallText}>Acepto términos y condiciones</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <CustomButton title="Confirmar" goTo={() => setCurrentScreen(3)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const Screen3 = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        <View style={styles.iconCircle}>
          <Ionicons name="mail-outline" size={50} color="black" />
        </View>
        <Text style={styles.title}>¡Revisa tu correo!</Text>
        <Text style={[styles.boldText, { textAlign: 'center', marginTop: 20 }]}>Confirmación de cuenta</Text>
        <Text style={[styles.smallText, { textAlign: 'center', marginBottom: 30 }]}>
          Te enviamos un mail para confirmar tu cuenta.
        </Text>
        <CustomInput placeholder="Código de mail" />
        <TouchableOpacity onPress={() => setCurrentScreen(5)}>
          <Text style={[styles.boldText, { marginTop: 20, textAlign: 'center' }]}>Ya lo confirmé, continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const Screen4 = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        <BigLogo />
        <Text style={styles.title}>Ingresa a tu cuenta</Text>
        <View style={{ width: '100%', marginTop: 20 }}>
          <CustomInput placeholder="Correo electrónico" />
          <CustomInput placeholder="Contraseña" secure={true} />
        </View>
      </View>
      <View style={styles.footerAuth}>
        {/* El login salta directo al Panel Responsable (P17) */}
        <CustomButton title="Continuar" goTo={() => setCurrentScreen(17)} />
      </View>
    </SafeAreaView>
  );

  const Screen5 = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BigLogo />
        <Text style={styles.title}>Activá BAProtege</Text>
        <Text style={styles.subtitle}>Configuración de Permisos</Text>
        <Text style={styles.paragraph}>Para que la aplicación funcione correctamente, necesitamos algunos permisos en tu dispositivo.</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-checkmark-outline" size={24} color="black" />
            <View style={styles.cardHeaderText}>
              <Text style={styles.boldText}>Paso 1: Administrador</Text>
              <Text style={styles.smallText}>Permiso activado correctamente</Text>
            </View>
            <Ionicons name="checkmark-circle" size={24} color="#555" />
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="phone-portrait-outline" size={24} color="black" />
            <View style={styles.cardHeaderText}>
              <Text style={styles.boldText}>Paso 2: Conexión VPN</Text>
            </View>
          </View>
          <Text style={styles.smallText}>La conexión VPN nos permite proteger tu dispositivo.</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.boldText}>Activar conexión VPN</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
        </View>
        <CustomButton title="Continuar" goTo={() => setCurrentScreen(6)} />
      </ScrollView>
    </SafeAreaView>
  );

  const Screen6 = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BigLogo />
        <Text style={styles.title}>Seleccioná el modo de uso</Text>
        <Text style={styles.subtitle}>Elegí cómo querés que funcione la protección en tu familia.</Text>
        <TouchableOpacity style={[styles.card, styles.row]} onPress={() => setCurrentScreen(7)}>
          <Ionicons name="person-outline" size={32} color="black" style={{marginRight: 15}} />
          <View style={{flex: 1}}>
            <Text style={styles.boldText}>Modo Responsable</Text>
            <Text style={styles.smallText}>Vinculá uno o más dispositivos protegidos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.row]} onPress={() => setCurrentScreen(9)}>
          <Ionicons name="people-outline" size={32} color="black" style={{marginRight: 15}} />
          <View style={{flex: 1}}>
            <Text style={styles.boldText}>Modo Protegido</Text>
            <Text style={styles.smallText}>Vinculá el dispositivo del menor.</Text>
          </View>
        </TouchableOpacity>
        <CustomButton title="Continuar" goTo={() => setCurrentScreen(7)} />
      </ScrollView>
    </SafeAreaView>
  );

  const Screen7 = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, {textAlign: 'left', marginTop: 40}]}>Agregar dispositivos protegidos</Text>
        <Text style={[styles.paragraph, {textAlign: 'left'}]}>Seleccioná el dispositivo que querés proteger</Text>
        {['Celular', 'Tablet', 'Notebook'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.bigOptionCard} onPress={() => setCurrentScreen(8)}>
            <Text style={styles.bigOptionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  const Screen8 = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, {textAlign: 'left', marginTop: 40}]}>Configurá tu acceso</Text>
        <Text style={[styles.paragraph, {textAlign: 'left'}]}>Este código los vas a usar en el dispositivo de tu hijo.</Text>
        <View style={styles.pinBox}>
          <Text style={styles.pinText}>4F82-9K</Text>
        </View>
        <Text style={[styles.boldText, {textAlign: 'center', marginVertical: 20}]}>Esperá el código</Text>
        <CustomButton title="Continuar" goTo={() => setCurrentScreen(11)} />
      </ScrollView>
    </SafeAreaView>
  );

  const Screen9 = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, {textAlign: 'left', marginTop: 40}]}>Vincular dispositivo</Text>
        <Text style={[styles.paragraph, {textAlign: 'left'}]}>Ingresá el código que te compartió tu responsable</Text>
        <View style={styles.pinBox}>
          <Text style={styles.pinText}>4F82-9K</Text>
        </View>
        <BigLogo />
        <CustomButton title="Continuar" goTo={() => setCurrentScreen(10)} />
      </ScrollView>
    </SafeAreaView>
  );

  const Screen10 = () => (
    <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
      <View style={styles.scrollContent}>
        <View style={{alignItems: 'center', marginBottom: 40}}>
          <Ionicons name="checkmark-circle-outline" size={120} color="#888" />
        </View>
        <Text style={[styles.title, {marginBottom: 20}]}>Dispositivo Vinculado</Text>
        <Text style={[styles.boldText, {textAlign: 'center', fontSize: 16, marginBottom: 60}]}>Ahora este equipo está protegido.</Text>
        <CustomButton title="Continuar" goTo={() => setCurrentScreen(11)} />
      </View>
    </SafeAreaView>
  );

  const Screen11 = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BigLogo />
        <Text style={styles.title}>Configurar protección</Text>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={[styles.row, {flex: 1}]}>
              <Ionicons name="shield-outline" size={28} color="black" style={{marginRight: 10}} />
              <View style={{flex: 1}}>
                <Text style={styles.boldText}>Sitios de Apuestas</Text>
                <Text style={styles.smallText}>Bloqueo de sitios y apps inadecuadas.</Text>
              </View>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={[styles.row, {flex: 1}]}>
              <Ionicons name="shield-outline" size={28} color="black" style={{marginRight: 10}} />
              <View style={{flex: 1}}>
                <Text style={styles.boldText}>Sitios de Información</Text>
                <Text style={styles.smallText}>(Opcional)</Text>
              </View>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </View>
        <CustomButton title="Siguiente" goTo={() => setCurrentScreen(12)} />
      </ScrollView>
    </SafeAreaView>
  );

  const Screen12 = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, {textAlign: 'left', marginTop: 40, fontSize: 22}]}>Resumen de Configuración</Text>
        <Text style={styles.sectionTitle}>Sitios de apuestas bloqueados</Text>
        <Text style={styles.listItem}>Sitios de información (opcional)</Text>
        <Text style={styles.sectionTitle}>Permisos</Text>
        <Text style={styles.listItem}>Administrador del dispositivo</Text>
        <Text style={styles.listItem}>VPN Local</Text>
        <View style={{marginTop: 40}}>
          <CustomButton title="Activar Protección" goTo={() => setCurrentScreen(13)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const Screen13 = () => (
    <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
      <View style={styles.scrollContent}>
        <View style={{alignItems: 'center', marginBottom: 40}}>
          <Ionicons name="checkmark-circle-outline" size={120} color="#888" />
        </View>
        <Text style={styles.title}>Activando Protección</Text>
        <Text style={[styles.boldText, {textAlign: 'center', fontSize: 18, marginTop: 20}]}>Esto puede tardar unos minutos</Text>
        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>
        <View style={{marginTop: 40}}>
          {/* Al terminar la carga, te lleva al Panel (P17) */}
          <CustomButton title="Continuar" goTo={() => setCurrentScreen(17)} />
        </View>
      </View>
    </SafeAreaView>
  );

  // --- PANTALLA 17 (PANEL RESPONSABLE) ---
  const Screen17 = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
          <Ionicons name="shield-checkmark-outline" size={40} color="black" />
          <Text style={[styles.boldText, {marginTop: 10, fontSize: 18}]}>Modo Responsable</Text>
          <Text style={[styles.title, {marginTop: 10}]}>Hola, Martin</Text>
          <Text style={[styles.paragraph, {marginTop: 10}]}>
            Desde este Panel podés gestionar tus dispositivos protegidos y la configuración de la app.
          </Text>
        </View>

        {[
          { title: 'Dispositivo protegido', sub: 'Ver y administrar' },
          { title: 'Eventos y actividad', sub: 'Ver y actividad' },
          { title: 'Alertas', sub: 'Notificaciones y avisos' },
          { title: 'Configuración', sub: 'Cuenta y preferencias' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuCard}>
            <Text style={styles.boldText}>{item.title}</Text>
            <Text style={styles.smallText}>{item.sub}</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );

  // --- RENDERIZADOR PRINCIPAL ---
  return (
    <View style={{ flex: 1 }}>
      <DevMenu />
      {currentScreen === 1 && <Screen1 />}
      {currentScreen === 2 && <Screen2 />}
      {currentScreen === 3 && <Screen3 />}
      {currentScreen === 4 && <Screen4 />}
      {currentScreen === 5 && <Screen5 />}
      {currentScreen === 6 && <Screen6 />}
      {currentScreen === 7 && <Screen7 />}
      {currentScreen === 8 && <Screen8 />}
      {currentScreen === 9 && <Screen9 />}
      {currentScreen === 10 && <Screen10 />}
      {currentScreen === 11 && <Screen11 />}
      {currentScreen === 12 && <Screen12 />}
      {currentScreen === 13 && <Screen13 />}
      {currentScreen === 17 && <Screen17 />}
    </View>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  footerAuth: { padding: 20, paddingBottom: 40, width: '100%' },
  
  // Menú dev
  devMenuContainer: { backgroundColor: '#ddd', paddingTop: 50, paddingBottom: 10, maxHeight: 100 },
  devBtn: { paddingHorizontal: 15, paddingVertical: 8, marginHorizontal: 5, backgroundColor: 'white', borderRadius: 5, height: 35 },
  devBtnActive: { backgroundColor: '#333' },
  
  // Textos y Logos
  bigLogo: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.circlePlaceholder, alignSelf: 'center', marginBottom: 20 },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.circlePlaceholder, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.textPrimary, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: colors.textPrimary, textAlign: 'center', marginBottom: 10, fontWeight: '600' },
  paragraph: { fontSize: 17, color: colors.textPrimary, textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  boldText: { fontSize: 15, fontWeight: 'bold', color: colors.textPrimary },
  smallText: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary, marginTop: 20, marginBottom: 10 },
  listItem: { fontSize: 17, color: colors.textPrimary, marginBottom: 8, paddingLeft: 10 },
  
  // Botones y Inputs
  button: { height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginVertical: 8, width: '100%' },
  primaryButton: { backgroundColor: colors.primary },
  outlineButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  buttonDisabled: { backgroundColor: colors.circlePlaceholder },
  buttonText: { color: colors.primaryText, fontSize: 16, fontWeight: '600' },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 6, height: 48, paddingHorizontal: 12, marginBottom: 15, width: '100%', fontSize: 15 },
  checkbox: { width: 18, height: 18, borderWidth: 1, borderColor: colors.border, borderRadius: 3, marginRight: 10 },
  
  // Tarjetas
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 15, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardHeaderText: { flex: 1, marginLeft: 10 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  
  // Botones Grandes
  bigOptionCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 15, padding: 30, marginBottom: 15, alignItems: 'center', justifyContent: 'center' },
  bigOptionText: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary },
  
  // Tarjetas del Panel (P17)
  menuCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 15, padding: 20, marginBottom: 15, alignItems: 'center', justifyContent: 'center' },

  // PIN
  pinBox: { borderWidth: 1, borderColor: colors.textPrimary, borderRadius: 10, paddingVertical: 20, paddingHorizontal: 40, alignSelf: 'center', marginVertical: 30 },
  pinText: { fontSize: 32, fontWeight: 'bold', letterSpacing: 2, color: colors.textPrimary },

  // Barra de progreso
  progressBarBg: { height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, width: '100%', overflow: 'hidden' },
  progressBarFill: { height: '100%', width: '60%', backgroundColor: '#A0A0A0' },

  // Logo Loteria de la ciudad
  logoImage: { 
    width: 180,      // Ancho de la imagen
    height: 180,     // Alto de la imagen
    alignSelf: 'center', // Centrado
    marginBottom: 10,    // Margen inferior para separar del texto
  },

});