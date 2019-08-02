import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class RadioButtons extends Component {
	state = {
		value: null,
	};

	render() {
		const { options } = this.props;
		const { value } = this.state;

		return (
			<View>
				{options.map(item => {
					return (

						<View key={item.key} style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.circle}
								onPress={() => {
									this.props.callback({
										qid: item.qid, qval : item.key
									}); this.setState({value : item.key})
								}}
							>
								{this.state.value === item.key && <View style={styles.checkedCircle} />}
							</TouchableOpacity>
							<Text style={{marginHorizontal:20,fontSize:18,fontFamily:'Roboto'}}>{item.text}</Text>
						</View>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		justifyContent:'center',
		marginBottom: 30,
	},

	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
	},
  
	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#794F9B',
		justifyContent:'center',
		alignContent:'center',
	},
});
