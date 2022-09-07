import * as React from 'react';
import { Button, View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import {Provider, connect} from 'react-redux';
import { addWish, deleteWish } from '../redux/actions';


function AddWishlist({addWish, deleteWish, wishlist, navigation})
{
	const [title, setTitle] = React.useState('');
	const [group, setGroup] = React.useState('');

	const addWishItem = () => {
		addWish(title, group);
		setTitle('');
		navigation.navigate('Wishlists');
	}

	return (
		<View>
			<Text>Title Wish</Text>
			<TextInput
				style={styles.input}
				onChangeText={(title) => setTitle(title)}
				value={title}
			/>
			<Text>Group</Text>
			<TextInput
				style={styles.input}
				onChangeText={(group) => setGroup(group)}
				value={group}
			/>
			<Button title="Добавить wishitem" onPress={() => {addWishItem()}}/>
			{/* <Button title="Добавить wishitem" onPress={() => (addWishItem())}/>
			<FlatList
				data={wishlist}
				keyExtractor={(item) => (item.id)}
				renderItem={({item, index}) => {
					return (

						<View>
							<Text>{item.title}</Text>
						</View>
				
					);
				}}
			/> */}
		</View>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
	  wishlist: state.wishes.wishlist,
	}
  }
  
const mapDispatchToProps = { addWish, deleteWish }

const styles = StyleSheet.create({
	input: {
	  height: 40,
	  margin: 12,
	  borderWidth: 1,
	  padding: 10,
	},
  });

export default connect(mapStateToProps, mapDispatchToProps)(AddWishlist)