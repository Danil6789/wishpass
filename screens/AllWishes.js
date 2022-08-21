import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SwipeListView } from 'react-native-swipe-list-view';
import {connect} from 'react-redux';


function AllWishes({wishlist})
{
	console.log('---=wishlist+==', wishlist)
	function removeDuplicates(data, key) {
  
		return [
		  ...new Map(data.map(item => [key(item), item])).values()
		]
	  
	  }


	const [listData, setListData] = React.useState(
		Array(20)
			.fill('')
			.map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
	);
	
	const closeRow = (rowMap, rowKey) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	};
	
	const deleteRow = (rowMap, rowKey) => {
		closeRow(rowMap, rowKey);
		const newData = [...listData];
		const prevIndex = listData.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		setListData(newData);
	};
	
	const onRowDidOpen = rowKey => {
		console.log('This row opened', rowKey);
	};
	
	const renderItem = data => (
		<TouchableHighlight
			onPress={() => console.log('You touched me')}
			style={styles.rowFront}
			underlayColor={'#AAA'}
		>
			<View>
				<Text>{data.item.title}</Text>
			</View>
		</TouchableHighlight>
	);
	
	const renderHiddenItem = (data, rowMap) => (
		<View style={styles.rowBack}>
			<TouchableOpacity
				style={[styles.backRightBtn, styles.backRightBtnRight]}
				onPress={() => deleteRow(rowMap, data.item.key)}
			>
				<Text style={styles.backTextWhite}>Delete</Text>
			</TouchableOpacity>
		</View>
	);
		return (  
			<View style={styles.container}>
			  <SwipeListView
				  disableRightSwipe
				  data={wishlist}
				  renderItem={renderItem}
				  renderHiddenItem={renderHiddenItem}
				  rightOpenValue={-75}
				  previewRowKey={'0'}
				  previewOpenValue={-40}
				  previewOpenDelay={3000}
				  onRowDidOpen={onRowDidOpen}
			  />
			</View>
		);
}

const mapStateToProps = (state, ownProps) => {
	return {
	  wishlist: state.wishes.wishlist,
	}
  }
	
export default connect(mapStateToProps, null)(AllWishes);

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
	},
	backTextWhite: {
		color: '#FFF',
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75,
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0,
	},
  });