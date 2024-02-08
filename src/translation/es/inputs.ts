export default {
  label: {
    email: 'Email',
    password: 'Contraseña',
    repeatPassword: 'Repetir contraseña',
    firstName: 'Nombre',
    lastName: 'Apellido',
    birthDate: 'Fecha de nacimiento',
    gender: 'Genero',
  },
  placeholder: {
    email: 'john.doe@example.com',
    // If you don't need the placeholder, just leave the key with an empty string
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
    birthDate: 'DD/MM/AAAA',
    gender: '',
    datepicker: 'Seleccione una fecha',
  },
  error: {
    required: '{{field}} es requerido',
    emailFormat: 'formato de email invalido',
    nameMinLength: '{{field}} debe contener {{min}} caracteres minimo',
    passwordMinLength: 'el password debe contener 6 caracteres minimo',
    passwordMatch: 'el password ingresado no coincide',
    genderValue: 'genero invalido, valores: {{male}} / {{female}}',
  },
};
