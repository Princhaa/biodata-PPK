import React, { Component } from 'react'
import { DeviceEventEmitter, View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native'

const { width, height } = Dimensions.get('window')
const BASE_URL = 'http://localhost:5000'

export default class Main extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isDataLoaded: false,
			data: null
		}
	}

	static navigationOptions = {
		header: null
	}

	componentWillMount() {
		DeviceEventEmitter.addListener('shouldRefresh', (e) => {
			if (e) {
				this.componentDidMount()
			}
		})
	}

	async componentDidMount() {
		let response = await fetch(BASE_URL + '/', {
			method: 'GET'
		})
		response = await response.json()
		this.setState({ data: response, isDataLoaded: true })
	}

	renderData() {
		if (this.state.isDataLoaded) {
			return (
				<View>
					<Image source={require('../assets/foto.jpg')} style={styles.image}/>
					<Text style={styles.text}>Nama</Text>
					<Text style={styles.textDetail}>{this.state.data.nama}</Text>
					<Text style={styles.text}>Alamat</Text>
					<Text style={styles.textDetail}>{this.state.data.alamat}</Text>
					<Text style={styles.text}>Fakultas</Text>
					<Text style={styles.textDetail}>{this.state.data.fakultas}</Text>
					<Text style={styles.text}>Jurusan</Text>
					<Text style={styles.textDetail}>{this.state.data.jurusan}</Text>
					<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Edit', { data: this.state.data })}>
						<Text style={{ color: 'white' }}>Edit</Text>
					</TouchableOpacity>	
				</View>
			)
		} else {
			return (
				<ActivityIndicator />
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Biodata</Text>
				<View style={styles.card}>
					{this.renderData()}			
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
	}
})