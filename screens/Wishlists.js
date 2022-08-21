import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {connect} from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import {deleteWish} from '../redux/actions';


function Wishlists({ navigation, route, wishlist, deleteWish} )
{
  console.log('+route+', wishlist)

  function removeDuplicates(data, key) {
  
    return [
      ...new Map(data.map(item => [key(item), item])).values()
    ]
  
  }
  //--------------------------------------------------------------------------------------------------------


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
const deleteWishItem = id => {
    console.log('--index--', id)
    deleteWish(id)
}


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
            <Text>{data.item.group}</Text>
        </View>
    </TouchableHighlight>
);

const renderHiddenItem = (data, rowMap) => {
        console.log('+id+', data);
    return (
        <View style={styles.rowBack}>
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => deleteWishItem(data.index)}
        >
            <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
    </View>
    );
}
    




	const wishlistGroup = removeDuplicates(wishlist.map((item, index)=>({ id: index, group:item.group})), item => item.group)
  console.log(wishlistGroup);
	return (  
        <View style={styles.container}>
          <SwipeListView
              disableRightSwipe
              keyExtractor={(item) => (item.id)}
              data={wishlistGroup}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-75}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
          />
          <Text>Wishlists</Text>
          <Button
            title="Добавить вишлист"
            onPress={() => navigation.navigate('AddWishlist')}
          />
      </View>

        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //   <FlatList
        //       data={wishlistGroup}
        //       keyExtractor={(item) => (item.id)}
        //       renderItem={({item, index}) => {
        //         return (
                    
        //           <TouchableOpacity onPress={() => {}}>
        //             <Text>{item.group}</Text>
        //           </TouchableOpacity>
              
        //         );
        //       }}
			  //   />
          // <Text>Wishlists</Text>
          // <Button
          //   title="Добавить вишлист"
          //   onPress={() => navigation.navigate('AddWishlist')}
          // />
      //</View>
	);

}

const mapStateToProps = (state, ownProps) => {
  return {
    wishlist: state.wishes.wishlist,
  }
}
  
export default connect(mapStateToProps, null)(Wishlists);

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