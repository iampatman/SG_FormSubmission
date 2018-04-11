import FormTemplates from '../../components/form/templates/Form.Templates'
import { Email, String } from '../../components/form/validations/Form.Validations'

export const schema = [
  {
    name: 'fullname',
    validation: {
      type: Email,
      errors: {}
    },
    template: FormTemplates.TEXT_INPUT,
    templateProps: {
      editable: false
    }
  },
  {
    name: 'email',
    validation: {
      type: Email,
      errors: {}
    },
    template: FormTemplates.TEXT_INPUT,
    templateProps: {
      editable: true
    }
  },
  {
    name: 'mobilePhone',
    validation: {
      type: String
    },
    template: FormTemplates.TEXT_INPUT,
    templateProps: {
      editable: true
    }
  },
  {
    name: 'gender',
    validation: {
      type: String
    },
    template: FormTemplates.TEXT_INPUT,
    templateProps: {}
  },
  {
    name: 'dateOfBirth',
    validation: {
      type: String
    },
    template: FormTemplates.DATE_INPUT,
    templateProps: {
      // editable: false
    }
  }
]
