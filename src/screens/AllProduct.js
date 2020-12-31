import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import {Button, DatePicker, Form, Label} from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import currencyFormat from '../helpers/currencyFormat';
import moment from 'moment';
import {Fontisto} from '@expo/vector-icons';

const sortArray = [
  ['Popular', {rating: 'DESC'}],
  ['Newest', {created_at: 'DESC'}],
  ['Price: lowest to highest', {price: 'ASC'}],
  ['Price: highest to lowest', {price: 'DESC'}],
];

function ModalSort({modalState, closeModal, sortArr, sortBy, selectSort}) {
  const [select, setSelect] = React.useState(sortBy);

  const closeTheModal = () => {
    closeModal();
    selectSort(select);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalState}>
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <View style={modalStyles.selectWrapper}>
            {sortArr.length
              ? sortArr.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      block
                      style={[
                        modalStyles.btn,
                        select === index ? modalStyles.btnSelected : null,
                      ]}
                      onPress={() => setSelect(index)}>
                      <Text
                        style={[
                          modalStyles.btnTxt,
                          select === index
                            ? modalStyles.btnTxtColorSelected
                            : null,
                        ]}>
                        {item[0]}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
          <TouchableOpacity
            style={modalStyles.openButton}
            onPress={closeTheModal}>
            <Text style={modalStyles.textStyle}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectWrapper: {
    width: 200,
  },
  btn: {
    width: '100%',
    borderRadius: 5,
    padding: '5%',
    backgroundColor: 'white',
  },
  btnSelected: {
    backgroundColor: '#457373',
  },
  btnTxt: {
    width: '100%',
    fontSize: 14,
    color: 'black',
  },
  btnTxtColorSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  openButton: {
    width: 200,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: '#102526',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

function ModalFilter({modalState, closeModal, setRange, after, before}) {
  const [values, setValues] = React.useState([null, null]);
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [maxDate, setMaxDate] = React.useState(new Date());
  const [minDate, setMinDate] = React.useState('2000/1/1');

  const multiSliderValuesChange = (value) => {
    setValues(value);
    // setRange(value);
  };

  const changeFromDate = (value) => {
    setFrom(value);
    // after(value);
    value = moment(value).format('YYYY/MM/DD');
    setMinDate(value);
    console.log(value);
  };

  const changeToDate = (value) => {
    setTo(value);
    // before(value);
    value = moment(value).format('YYYY/MM/DD');
    setMaxDate(value);
    console.log(value);
  };
  const discardAll = () => {
    setFrom('');
    setTo('');
    setValues([null, null]);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalState}>
      <View style={filterStyles.centeredView}>
        <View style={filterStyles.modalView}>
          <View style={filterStyles.priceWrapper}>
            <Text style={filterStyles.btnTxt}>Price</Text>
            <MultiSlider
              values={[values[0], values[1] ? values[1] : 1000000]}
              sliderLength={300}
              onValuesChange={multiSliderValuesChange}
              min={0}
              max={1000000}
              step={10}
            />
            <View style={filterStyles.textWrapper}>
              <Text style={filterStyles.text}>{currencyFormat(values[0])}</Text>
              <Text style={filterStyles.text}>{currencyFormat(values[1])}</Text>
            </View>
          </View>
          <View style={filterStyles.dateContainer}>
            <Text style={filterStyles.btnTxt}>Date</Text>
            <View style={filterStyles.textDateWrapper}>
              <View style={filterStyles.dateWrapper}>
                <Text style={filterStyles.text}>From</Text>
                <Form>
                  <DatePicker
                    minimumDate={new Date('2000, 1, 1')}
                    maximumDate={new Date(maxDate)}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText={
                      from ? (
                        minDate
                      ) : (
                        <Fontisto name="date" size={24} color="black" />
                      )
                    }
                    textStyle={filterStyles.text}
                    placeHolderTextStyle={filterStyles.text}
                    onDateChange={(e) => changeFromDate(e)}
                  />
                </Form>
              </View>

              <View style={filterStyles.dateWrapper}>
                <Text style={filterStyles.text}>To</Text>
                <DatePicker
                  minimumDate={new Date(minDate)}
                  maximumDate={new Date()}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText={
                    to ? (
                      maxDate
                    ) : (
                      <Fontisto name="date" size={24} color="black" />
                    )
                  }
                  textStyle={filterStyles.text}
                  placeHolderTextStyle={filterStyles.text}
                  onDateChange={(e) => changeToDate(e)}
                />
              </View>
            </View>
          </View>
          <View style={filterStyles.dualBtnWrapper}>
            <View style={filterStyles.dualBtnContainer}>
              <TouchableOpacity
                style={filterStyles.discardButton}
                onPress={discardAll}>
                <Text style={filterStyles.textDiscardStyle}>Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={filterStyles.openButton}
                onPress={closeModal}>
                <Text style={filterStyles.textStyle}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const filterStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  priceWrapper: {
    alignItems: 'center',
    width: 300,
    marginVertical: 10,
  },
  dateContainer: {
    alignItems: 'center',
    width: 300,
    marginTop: 30,
    marginBottom: 20,
  },
  btn: {
    width: '100%',
    borderRadius: 5,
    padding: '5%',
    backgroundColor: 'white',
  },
  btnSelected: {
    backgroundColor: '#457373',
  },
  btnTxt: {
    width: '100%',
    fontSize: 14,
    color: '#102526',
    fontWeight: 'bold',
  },
  textWrapper: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textDateWrapper: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  dateWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  text: {
    fontSize: 12,
    color: '#457373',
  },
  btnTxtColorSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  discardButton: {
    width: '35%',
    marginTop: 30,
    marginBottom: 10,
    borderColor: '#7C4935',
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
  },
  openButton: {
    width: '35%',
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: '#457373',
    borderRadius: 20,
    padding: 10,
  },
  dualBtnWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dualBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  textDiscardStyle: {
    color: '#7C4935',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default function AllProduct({route}) {
  const {title} = route.params;
  const [sortBy, setSortBy] = React.useState(0);
  const [stack, setStack] = React.useState(true);
  const [price, setPrice] = React.useState([null, null]);
  const [date, setDate] = React.useState(['', '']);
  const [search, setSearch] = React.useState({});
  const [sort, setSort] = React.useState({});

  const [openModalFilter, setOpenModalFilter] = React.useState(false);
  const [openModalSort, setOpenModalSort] = React.useState(false);

  const setRange = (e) => {
    setPrice(e);
  };

  const priceBottom = (e) => {
    const newPrice = [e, price[1]];
    setPrice(newPrice);
  };

  const before = (e) => {
    const newDate = [date[0], e];
    setDate(newDate);
  };

  const after = (e) => {
    const newDate = [e, date[1]];
    setDate(newDate);
  };

  const selectSort = (e) => {
    setSortBy(e);
  };

  React.useEffect(() => {
    setSort({sort: sortArray[sortBy][1]});
  }, [sortBy]);

  const changeStack = () => {
    setStack(!stack);
  };

  const toggleModalFilter = () => {
    setOpenModalFilter(!openModalFilter);
  };

  const toggleModalSort = () => {
    setOpenModalSort(!openModalSort);
  };

  return (
    <View style={styles.parent}>
      <ModalSort
        modalState={openModalSort}
        closeModal={toggleModalSort}
        sortArr={sortArray}
        sortBy={sortBy}
        selectSort={selectSort}
        selected={sortBy}
      />

      <ModalFilter
        modalState={openModalFilter}
        closeModal={toggleModalFilter}
      />
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>{title ? title : 'All items'}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={toggleModalFilter} style={styles.filter}>
            <MaterialIcons name="filter-list" size={24} color="black" />
            <Text style={styles.filterTxt}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModalSort} style={styles.sort}>
            <MaterialIcons name="swap-vert" size={24} color="black" />
            <Text style={styles.sortTxt}>
              {'Sort by: ' + sortArray[sortBy][0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={changeStack} style={styles.display}>
            {stack ? (
              <MaterialIcons name="view-list" size={24} color="black" />
            ) : (
              <MaterialIcons name="view-module" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.productWrapper}>
        {/* <FlatList
          item={}
          renderItem={(item) => {

          }} /> */}
        <Text>waw</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#5A6868',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  titleWrapper: {
    marginVertical: 10,
    width: '100%',
  },
  titleText: {
    fontSize: 34,
    color: '#102526',
    fontWeight: 'bold',
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  filter: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  filterTxt: {
    marginLeft: 5,
    fontSize: 12,
    color: '#102526',
  },
  sort: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sortTxt: {
    marginLeft: 5,
    fontSize: 12,
    color: '#102526',
  },
  display: {
    width: '30%',
    alignItems: 'flex-end',
  },
  productWrapper: {
    padding: '5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
