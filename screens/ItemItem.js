import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { addWish, deleteWish } from '../redux/actions';
import {connect} from 'react-redux';



export default function ItemItem({navigation, route}) {

  return (
   <View style={styles.container}>
    <Text>Название: {route.params.item.title}</Text>
    <Text>Номер: {route.params.item.id}</Text>
    <Text>Группа: {route.params.item.group}</Text>   
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
});




// export default connect(mapStateToProps, mapDispatchToProps)(ItemItem)