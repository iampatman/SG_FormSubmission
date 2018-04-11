// @flow
import _ from 'lodash'
import t from 'tcomb-form-native'
import FormTemplates from './templates/Form.Templates'

/**
 * Get Form Item template from schema
 * @param {Object} item: Form Item
 */
export const getTemplate = (item: Object): Object => {
  return item.template
}

/**
 * Get Form Item template from schema
 * @param {Object} item: Form Item
 */
export const getValidation = (item: Object): Object => {
  if (!item.validation) return {}
  return item.validation
}

/**
 * Get value type of Form Item
 * @param {Object} item: Form Item
 */
export const getStructType = (item: Object): Function => {
  const validation = getValidation(item)

  if (getTemplate(item) === FormTemplates.CUSTOM) {
    return t.maybe(t.String)
  }

  const type = validation.type

  if (item.validation && item.validation.optional) return t.maybe(type)
  return type
}

export const getHidden = (item: Object): boolean => {
  return item.templateProps && item.templateProps.hidden
}

/**
 * Get column style, only use for FormItem in a Row
 * @param {Object} item
 */
export const getColumnStyle = (item: Object) => {
  return item.columnStyle || {}
}

/**
 * Get Form Item configurations
 * @param {Object} item
 */
export const getItemConfig = (item: Object) => {
  const type = getStructType(item)
  const fields = {}

  fields.template = getTemplate(item)
  fields.hidden = getHidden(item)
  fields.config = {
    validation: getValidation(item),
    ...(item.templateProps ? item.templateProps : {})
  }

  return {type, fields}
}

/**
 * Generate row form name
 * @param {Array} Row schema
 */
export const getRowName = (row: Array<Object>) => {
  let names = ''
  row.forEach(item => {
    names = `${names}${_.capitalize(item.name)}`
  })
  return `row${names}`
}

/**
 * Get form item path, use for validation
 * @param {String | Array<String>} path
 */
export const getFormItemPath = (path: Array<string>): string | Array<string> => {
  if (path instanceof Array && path.length > 0) return _.capitalize(path[path.length - 1])
  return path
}
