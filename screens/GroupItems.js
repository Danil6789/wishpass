import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import { addWish, deleteWish } from '../redux/actions';
import {connect} from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';


function GroupItems({navigation, route, wishlist}) {

const routeItem = route.params.item.group;

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => {
		console.log('data', data)
        return (
            <TouchableHighlight onPress={() => navigation.navigate('ItemItem', {item: data.item})}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View>
                    <Text>{data.item.title}</Text>
                </View>
				
            </TouchableHighlight>
        );
    }

    const renderHiddenItem = (item, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteWishItem(item.item.id)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const [listGroup, setListGroup] = React.useState(wishlist);

    console.log('route', route)

    const filterGroup = () => {
        setListGroup(listGroup.filter((item) => (item.group == routeItem)));
    }
    React.useEffect(() => {
        if (listGroup || routeItem) {
            filterGroup()
        }
       
        
    }, [routeItem]);

console.log('listGroup', listGroup)

  return (
   <View style={styles.container}>
      <SwipeListView
				  disableRightSwipe
				  data={listGroup}
				  renderItem={renderItem}
				  renderHiddenItem={renderHiddenItem}
				  rightOpenValue={-75}
				  previewRowKey={'0'}
				  previewOpenValue={-40}
				  previewOpenDelay={3000}
				  onRowDidOpen={onRowDidOpen}
	/>
    <Text>{routeItem}</Text>
	<Button style={styles.button}
            title="Добавить виш"
            onPress={() => {navigation.navigate('AddWish', {item: listGroup[0]})}}
    />
   </View>
  );
}


const mapStateToProps = (state, ownProps) => {
	return {
	  wishlist: state.wishes.wishlist,
	}
  }
  
const mapDispatchToProps = { addWish, deleteWish }

export default connect(mapStateToProps, mapDispatchToProps)(GroupItems)




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