import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Button from '../components/Button';
import {GET, POST} from '../utils/fetch';
import DropDownHolder from '../utils/dropdown';
const moment = require('moment');

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

class Search extends React.Component {
  state = {
    date: '',
    todos: [],
    todo_more: {},
    showModal: false,
    typeOfModal: 'ADD',
    searchClicked: false,
  };

  handleSearch() {
    const {date} = this.state;
    if (moment(date, 'DD-MM-YYYY', true).isValid()) {
      this.setState({searchClicked: true});
      this.getTODO(date);
    } else {
      DropDownHolder.dropDown.alertWithType(
        'error',
        'Error',
        'Enter valid date',
      );
    }
  }

  async getTODO(date) {
    const date_is = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const data = await GET(`todo/?date=${formatDate(new Date(date_is))}`);
    if (data.data) {
      const {data: todos} = data;
      this.setState({todos, showModal: false});
    }
  }

  async handleEdit() {
    const {todo_more, date} = this.state;
    if (todo_more.description === '') {
      DropDownHolder.dropDown.alertWithType(
        'error',
        'Error',
        'Please enter description',
      );
    } else {
      const data = await POST(
        `todo/${todo_more.id}`,
        {
          description: todo_more.description,
        },
        'put',
      );
      if (data.data) {
        this.getTODO(date);
      }
    }
  }

  async handleAdd() {
    const {todo_more, date} = this.state;
    if (Object.keys(todo_more).length === 0) {
      DropDownHolder.dropDown.alertWithType(
        'error',
        'Error',
        'Please enter description',
      );
    } else {
      const date_is = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
      const data = await POST(
        'todo/',
        {
          description: todo_more.description,
          date: new Date(date_is),
        },
        'post',
      );
      if (data.data) {
        this.getTODO(date);
        this.setState({todo_more: {}});
      }
    }
  }

  async handleDone(todo) {
    const {date} = this.state;
    const data = await POST(
      `todo/${todo.id}`,
      {
        done: !todo.done,
      },
      'put',
    );
    if (data.data) {
      this.getTODO(date);
    }
  }

  async handleDelete() {
    const {date, todo_more} = this.state;
    const data = await GET(`todo/${todo_more.id}`, 'delete');
    if (data.success) {
      this.getTODO(date);
    }
  }

  GetTodoList() {
    const {todos} = this.state;
    if (todos.length === 0) {
      return <Text style={styles.empty}> No Todos for this day</Text>;
    }
    return todos.map((todo) => (
      <View
        key={todo.id}
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
              this.handleDone(todo);
            }}>
            <View style={styles.cta1}>
              <Text style={styles.ctatext}>{todo.done ? 'Undo' : 'Done'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                todo_more: todo,
                showModal: true,
                typeOfModal: 'EDIT',
              });
            }}>
            <View style={styles.cta1}>
              <Text style={styles.ctatext}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ));
  }

  render() {
    const {typeOfModal, searchClicked} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TextInput
            placeholder="DD-MM-YYYY"
            style={styles.TextInput1}
            autoCapitalize="none"
            placeholderTextColor="#686868"
            onChangeText={(date) => {
              this.setState({
                date,
                todo: [],
                todo_more: {},
                searchClicked: false,
              });
            }}
          />
          <Button title="Search" handleOnClick={() => this.handleSearch()} />
        </View>
        {searchClicked && (
          <View>
            <View style={styles.listContaienr}>
              <View style={styles.addButton}>
                <Button
                  title="+ Add"
                  style={styles.addButtonStyle}
                  handleOnClick={() =>
                    this.setState({
                      showModal: true,
                      typeOfModal: 'ADD',
                      todo_more: {},
                    })
                  }
                />
              </View>
              {this.GetTodoList()}
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
                    onChangeText={(value) => {
                      const todo_more = Object.assign({}, this.state.todo_more);
                      todo_more.description = value;
                      this.setState({todo_more});
                    }}
                  />
                  <View style={styles.modalButton}>
                    <TouchableOpacity
                      onPress={() => {
                        typeOfModal === 'ADD'
                          ? this.handleAdd()
                          : this.handleEdit();
                      }}>
                      <View style={styles.cta1}>
                        <Text style={styles.ctatext1}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                    {typeOfModal === 'EDIT' && (
                      <TouchableOpacity
                        onPress={() => {
                          this.handleDelete();
                        }}>
                        <View style={styles.cta2}>
                          <Text style={styles.ctatext1}>Delete</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  TextInput1: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 12,
    width: 200,
    marginRight: 16,
    color: 'black',
    fontSize: 16,
    borderRadius: 4,
    paddingHorizontal: 20,
    textAlign: 'center',
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
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 16,
    backgroundColor: 'white',
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
  textContainer: {
    flex: 1,
  },
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
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  modalDescription: {
    fontSize: 16,
  },
  x: {
    fontSize: 18,
    fontWeight: '500',
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  empty: {
    textAlign: 'center',
    fontSize: 18,
  },
  addButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 16,
  },
  addButtonStyle: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'green',
  },
});
