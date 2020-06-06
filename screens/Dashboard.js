import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import Button from '../components/Button';
import {GET} from '../utils/fetch';

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

class Dashboard extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            source={require('../images/default_pp.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    selected: 'TODAY',
    todos: [],
    todo_more: {},
    showModal: false,
  };

  componentDidMount() {
    this.getTODO();
  }

  async getTODO(date) {
    const date_value = date ? date : new Date();
    const data = await GET(`todo/?date=${formatDate(date_value)}`);
    if (data.data) {
      const {data: todos} = data;
      this.setState({todos});
    }
  }

  handleButtonClick(value) {
    let date = '';
    const today = new Date();
    if (value === 'YESTERDAY') {
      date = new Date(today.setDate(today.getDate() - 2));
    } else if (value === 'TODAY') {
      date = new Date();
    } else if (value === 'TOMORROW') {
      date = new Date(today.setDate(today.getDate() + 1));
    }
    this.setState({selected: value});
    this.getTODO(date);
  }

  GetTodoList() {
    const {todos} = this.state;
    return todos.map((todo) => (
      <View
        style={[
          styles.todoContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {backgroundColor: todo.done ? '#ececec' : 'white'},
        ]}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.description,
              // eslint-disable-next-line react-native/no-inline-styles
              {textDecorationLine: todo.done ? 'line-through' : 'none'},
            ]}>
            {todo.description}
          </Text>
        </View>
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log('done');
            }}>
            <View style={styles.cta1}>
              <Text style={styles.ctatext}>{todo.done ? 'Undo' : 'Done'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({todo_more: todo, showModal: true});
            }}>
            <View style={styles.cta1}>
              <Text style={styles.ctatext}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal transparent={true} visible={this.state.showModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalDescription}>Description</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({showModal: false});
                  }}>
                  <Text style={styles.x}>X</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                value={this.state.todo_more.description}
                style={styles.TextInput}
                autoCapitalize="none"
              />
              <View style={styles.modalButton}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('submit');
                  }}>
                  <View style={styles.cta1}>
                    <Text style={styles.ctatext1}>Submit</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    console.log('delete');
                  }}>
                  <View style={styles.cta2}>
                    <Text style={styles.ctatext1}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    ));
  }

  render() {
    const {selected} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="Yesterday"
            handleOnClick={() => this.handleButtonClick('YESTERDAY')}
            style={selected === 'YESTERDAY' ? styles.green : {}}
          />
          <Button
            title="Today"
            handleOnClick={() => this.handleButtonClick('TODAY')}
            style={selected === 'TODAY' ? styles.green : {}}
          />
          <Button
            title="Tomorrow"
            handleOnClick={() => this.handleButtonClick('TOMORROW')}
            style={selected === 'TOMORROW' ? styles.green : {}}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Search');
            }}>
            <View style={styles.search}>
              <Text style={styles.searchText}>&#x2315;</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.listContaienr}>{this.GetTodoList()}</View>
      </View>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    marginRight: 16,
    backgroundColor: 'white',
  },
  container: {
    margin: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  green: {
    backgroundColor: 'green',
  },
  search: {
    backgroundColor: '#0b7bfe',
    paddingHorizontal: 11,
    paddingVertical: 1,
    borderRadius: 20,
  },
  searchText: {
    color: 'white',
    fontSize: 30,
  },
  todoContainer: {
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    borderColor: 'lightgrey',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {flex: 1},
  description: {
    flexWrap: 'wrap',
    fontSize: 16,
  },
  ctaContainer: {flexDirection: 'row'},
  listContaienr: {
    marginTop: 16,
  },
  cta1: {
    backgroundColor: '#0b7bfe',
    borderRadius: 4,
    marginLeft: 6,
  },
  cta2: {
    backgroundColor: '#D00000',
    borderRadius: 4,
    marginLeft: 6,
  },
  ctatext: {
    padding: 6,
    color: 'white',
    textAlign: 'center',
  },
  ctatext1: {
    padding: 8,
    color: 'white',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    width: 350,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  TextInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgrey',
    margin: 16,
    padding: 16,
    width: 300,
    color: 'black',
    fontSize: 16,
    borderRadius: 4,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  modalDescription: {fontSize: 16},
  x: {fontSize: 18, fontWeight: '500'},
  modalButton: {flexDirection: 'row', justifyContent: 'flex-end'},
});
