import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

export default function SupportScreen() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [expanded, setExpanded] = useState(null); // Controla qué FAQ está abierto

  const sendEmail = async () => {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Error', 'No hay una app de correo disponible en este dispositivo.');
        return;
      }

      await MailComposer.composeAsync({
        recipients: ['amujicabarcelo@deloitte.es'],
        subject: subject,
        body: body,
      });
      Alert.alert('Éxito', 'El correo se abrió para enviar. Confirma el envío en tu app de correo.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir el correo: ' + error.message);
    }
  };

  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index); // Abre/cierra el FAQ
  };

  const faqs = [
    {
      question: '¿Cómo puedo cambiar mi contraseña?',
      answer: 'Ve a la pestaña "Profile", luego a "Settings" y selecciona "Cambiar contraseña".',
    },
    {
      question: '¿Por qué no recibo notificaciones?',
      answer: 'Asegúrate de que las notificaciones estén habilitadas en la configuración de tu dispositivo.',
    },
    {
      question: '¿Cómo contacto al soporte técnico?',
      answer: 'Usa este formulario o escribe directamente a marinacenalmor@gmail.com.',
    },{
      question: '¿Muji es un crack?',
      answer: 'Si, Muji es un crack.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Soporte</Text>

      {/* Formulario de contacto */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe el asunto"
          value={subject}
          onChangeText={setSubject}
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.bodyInput]}
          placeholder="Escribe tu mensaje aquí"
          value={body}
          onChangeText={setBody}
          multiline
          numberOfLines={4}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.submitButton} onPress={sendEmail}>
          <Text style={styles.submitButtonText}>Enviar Mensaje</Text>
        </TouchableOpacity>
      </View>

      {/* Sección FAQ */}
      <Text style={styles.faqHeader}>Preguntas Frecuentes</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity
            style={styles.faqQuestion}
            onPress={() => toggleFAQ(index)}
          >
            <Text style={styles.faqQuestionText}>{faq.question}</Text>
            <Text style={styles.faqArrow}>{expanded === index ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {expanded === index && (
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fondo gris claro
    paddingVertical: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  bodyInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  faqHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  faqItem: {
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  faqArrow: {
    fontSize: 16,
    color: '#f4511e',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    padding: 15,
    paddingTop: 0,
  },
});