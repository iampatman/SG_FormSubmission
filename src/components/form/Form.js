/**
 * @flow
 * The Form component wrapper uses to generate Form
 * - value: the Form values
 * - onValueChange: the callback when Form values has been changed
 * - schema: form schema
 const sameSchema = [
 {
   name: 'email',
   validation: {
     type: Email,
     errors: {
       empty: 'This is a custom message for empty error',
       invalid: 'Hello, invalid email'
     }
   },
   template: FormTemplates.TEXT_INPUT,
   templateProps: {
     hidden: true
   }
 },
 {
   name: 'password',
   validation: {
     optional: true,
     type: String
   },
   template: FormTemplates.TEXT_INPUT,
   templateProps: {
     secureTextEntry: true
   }
 },
 {
   name: 'custom',
   template: FormTemplate.CUSTOM,
   templateProps: {
     render: Function,
     ...otherProps
   }
 },
 [
 {
   name: 'gender',
   validation: {
     optional: true,
     type: String
   },
   template: FormTemplates.TEXT_INPUT,
   templateProps: {
     secureTextEntry: true
   }
 },
 {
   name: 'birthday',
   validation: {
     optional: true,
     type: String
   },
   template: FormTemplates.TEXT_INPUT,
   templateProps: {
     secureTextEntry: true
   }
 }
 ]
 ]
 */
import _ from 'lodash'
import React, {Component} from 'react'
import t from 'tcomb-form-native'
import tr from '../../localization/Translator'
import {getItemConfig, getRowName} from './Form.Util'
import FormRowTemplate from './templates/Row/Form.Row.Template'

const Form = t.form.Form
Form.i18n = tr.getLanguagePack().form

type Props = {
  value?: Object,
  onChange?: Function,
  schema: Array<*>
}

type State = {
  schema: Array<*>,
  formData: Object,
  options: Object,
  value?: Object | null
}

export default class FormExt extends Component<Props, State> {
  form: Form
  state: State

  constructor (props: Props) {
    super(props)
    this.state = {
      schema: props.schema,
      ...this.readFormConfig(props.schema),
      value: props.value
    }
  }

  componentWillReceiveProps (nextProps: Object) {
    if (nextProps.value && !_.isEqual(nextProps.value, this.state.value)) {
      this.setState({value: nextProps.value})
    }
  }

  readFormConfig = (schema: Array<Object>): Object => {
    const formData = {}
    const options = {
      auto: 'placeholders',
      fields: {}
    }

    schema.forEach(item => {
      if (item instanceof Array) {
        const rowName = getRowName(item)
        const rowConfig = this.readFormConfig(item)

        formData[rowName] = rowConfig.formData
        options.fields[rowName] = rowConfig.options
        options.fields[rowName].template = FormRowTemplate
      } else {
        const {fields, type} = getItemConfig(item)
        if (!fields.hidden) {
          formData[item.name] = type
          options.fields[item.name] = fields
        }
      }
    })

    return {
      formData: t.struct(formData),
      options
    }
  }

  /**
   * onValueChange
   */
  onValueChange = (value: Object | null): void => {
    const {onChange} = this.props
    this.setState({value}, () => {
      if (onChange) onChange(value)
    })
  }

  /**
   * Translate for validation
   */
  translateValidationMessage = (key: string, params: Object): string => {
    return tr(`form.validations.${key}`, params)
  }

  /**
   * Validate form
   */
  validate = () => {
    return this.form.validate()
  }

  /**
   * Get form value
   */
  getValue = (): Object => {
    return this.form.getValue()
  }

  /**
   * Update Form Item in real time
   */
  updateSchema = (schema: Array<*>): void => {
    this.setState({
      schema,
      ...this.readFormConfig(schema)
    })
  }

  /**
   * Clear form value
   */
  clear = (): void => {
    this.onValueChange(null)
  }

  /**
   * Get a Form Item component
   */
  getItemComponent = (key: string): Object => {
    return this.form.getComponent(key)
  }

  /**
   * Just use for internal mutate
   */
  updateItemPropsWithoutMutateState = (newSchema: Array<*>, key: string, props: Object = {}): Array<*> => {
    let hasUpdated = false
    const updateItem = (tree, key, newProps) => {
      for (let i = 0; i < tree.length; i++) {
        if (hasUpdated) break

        const item = tree[i]
        if (item instanceof Array) {
          updateItem(tree[i], key, newProps)
        } else {
          if (item.name === key) {
            // update props
            tree[i].templateProps = {
              ...tree[i].templateProps,
              ...newProps
            }
            hasUpdated = true
          }
        }
      }
    }

    updateItem(newSchema, key, props)
    return newSchema
  }

  /**
   * Update Form Item Property
   */
  updateItemProps = (key: string, props: Object = {}): void => {
    let newSchema: Array<*> = this.state.schema.slice(0)
    newSchema = this.updateItemPropsWithoutMutateState(newSchema, key, props)
    this.updateSchema(newSchema)
  }

  /**
   * Toogle form items hidden
   */
  setHiddenOfItems = (keys: Array<string>, hidden: boolean) => {
    let newSchema: Array<*> = this.state.schema.slice(0)
    _.forEach(keys, k => {
      newSchema = this.updateItemPropsWithoutMutateState(newSchema, k, {hidden})
    })
    this.updateSchema(newSchema)
  }
  /**
   * Hide form items in real-time
   */
  hideItems = (keys: Array<string>) => {
    this.setHiddenOfItems(keys, true)
  }

  /**
   * Show form items in real-time
   */
  showItems = (keys: Array<string>) => {
    this.setHiddenOfItems(keys, false)
  }

  render () {
    const {
      formData,
      options,
      value
    } = this.state

    return (
      <Form
        ref={ref => {
          this.form = ref
        }}
        type={formData}
        options={options}
        value={value}
        onChange={this.onValueChange}
        context={{tr: this.translateValidationMessage}}
      />
    )
  }
}
