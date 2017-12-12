import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, StyleSheet } from 'react-native'

class CustomTextInput extends Component {

	focus = () => this.textInputRef.focus()

	render() {
		const { placeholder, style, children, ...otherProps } = this.props
		return (
			<View style={style || styles.container}>
				{children}
				<TextInput
					style={{ flex: 1 }}
					underlineColorAndroid={'transparent'}
					placeholder={placeholder}
					ref={(ref) => this.textInputRef = ref}
					{...otherProps}
				/>
			</View>
		)
	}

}

CustomTextInput.propTypes = {
	placeholder: PropTypes.string.isRequired,
	style: PropTypes.any
}

CustomTextInput.defaultProps = {
	placeholder: 'Insert placeholder here',
	style: styles
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
		justifyContent: 'center',
		height: 40,
		flexDirection: 'row'
	}
})

export default CustomTextInput