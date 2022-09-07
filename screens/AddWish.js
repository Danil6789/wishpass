import * as React from 'react';
import { Button, View, Text, StyleSheet, TextInput} from 'react-native';
import { addWish, deleteWish } from '../redux/actions';
import {connect} from 'react-redux';



function AddWish({navigation, route}) {
console.log('route', route)
    const group = route.params.item.group
    const [title, setTitle] = React.useState('');
    const addWishItem = () => {
		addWish(title, group);
		setTitle('');
		navigation.navigate('GroupItems');
	}
  return (
   <View style={styles.container}>
     <Text>Title Wish</Text>
			<TextInput
				style={styles.input}
				onChangeText={(title) => setTitle(title)}
				value={title}
			/>
    <Button style={styles.button}
            title="Добавить виш" onPress={() => {addWishItem()}}
          />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    flex: 2,
    bottom: '10px',
    left: '50%',
    marginLeft: '-104.5px',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const mapStateToProps = (state, ownProps) => {
	return {
	  wishlist: state.wishes.wishlist,
	}
  }
  
const mapDispatchToProps = { addWish, deleteWish }

export default connect(mapStateToProps, mapDispatchToProps)(AddWish)