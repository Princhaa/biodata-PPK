import React, { Component } from 'react'
import { DeviceEventEmitter, View, StyleSheet, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import CustomTextInput from '../components/CustomTextInput'

const BASE_URL = 'http://localhost:5000'
const { width, height } = Dimensions.get('window')

export default class Main extends Component {

	constructor(props) {
		super(props)
		const data = props.navigation.state.params.data		
		this.state = {
			nama: data.nama,
			alamat: data.alamat,
			fakultas: data.fakultas,
			jurusan: data.jurusan,
			isUpdating: false
		}
	}

	static navigationOptions = {
		header: null
	}

	async update() {
		this.setState({ isUpdating: true })
		await fetch(BASE_URL+'/update', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				nama: this.state.nama,
				alamat: this.state.alamat,
				fakultas: this.state.fakultas,
				jurusan: this.state.jurusan
			})
		})
		DeviceEventEmitter.emit('shouldRefresh', true)
		this.props.navigation.goBack(null)
	}

	renderButton() {
		if (this.state.isUpdating) {
			return (
				<ActivityIndicator />
			)
		} else {
			return (
				<Text style={{ color: 'white' }}>Edit</Text>
			)
		}
	}

	render() {
		const data = this.props.navigation.state.params.data
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Biodata</Text>
				<View style={styles.card}>
					<Text style={styles.text}>Nama</Text>
					<CustomTextInput 
						placeholder={'Nama'}
						defaultValue={data.nama}
						style={styles.textInput}
						onChangeText={(value) => this.setState({ nama: value })}
					/>
					<Text style={styles.text}>Alamat</Text>
					<CustomTextInput 
						placeholder={'Alamat'}
						defaultValue={data.alamat}
						style={styles.textInput}
						onChangeText={(value) => this.setState({ alamat: value })}
					/>
					<Text style={styles.text}>Fakultas</Text>
					<CustomTextInput 
						placeholder={'Fakultas'}
						defaultValue={data.fakultas}
						style={styles.textInput}
						onChangeText={(value) => this.setState({ fakultas: value })}
					/>
					<Text style={styles.text}>Jurusan</Text>
					<CustomTextInput 
						placeholder={'Jurusan'}
						defaultValue={data.jurusan}
						style={styles.textInput}
						onChangeText={(value) => this.setState({ jurusan: value })}
					/>
					<TouchableOpacity style={styles.button} onPress={() => this.update()}>
						{this.renderButton()}
					</TouchableOpacity>				
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 20,
		paddingTop: 50,
		alignItems: 'center'
	},

	title: {
		color: '#377dff',
		fontSize: 20,
		fontWeight: '400'
	},

	card: {
		marginTop: 20,
		height: height * 0.9,
		width: width * 0.9,
		padding: 20,
		shadowColor: 'rgba(184, 184, 184, 0.5)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 10,
		shadowOpacity: 1,
		borderRadius: 5
	},

	text: {
		marginVertical: 5,
		fontSize: 10
	},

	textDetail: {
		fontSize: 20,
		marginBottom: 10
	},

	image: {
		height: 80,
		width: 80,
		borderRadius: 40,
		marginVertical: 10,
		position: 'absolute',
		right: 20,
		top: 10,
		zIndex: 1
	},

	button: {
		width: width*0.8,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#377dff',
		borderRadius: 5
	},

	textInput: {
		borderColor: '#ededed',
		borderWidth: 1,
		marginVertical: 5,
		backgroundColor: 'white',
		paddingHorizontal: 10,
		borderRadius: 5,
		height: 50,
		width: width * 0.8,
		justifyContent: 'center',
		flexDirection: 'row',
	},
})