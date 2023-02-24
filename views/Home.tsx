import React, { useEffect, useMemo, useState } from 'react';
import {
  Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ModalPicker from '../components/ModalPicker';
import Badge from '../components/Badge';
import SearchBar from '../components/SearchBar';
import { SORT_OPTION, TAGS } from '../constants';
import {
  ISymbol, ITag, ITicker, IToken,
} from '../interfaces';
import { useSymbolList } from '../hooks/useSymbolList';
import { useTickerList } from '../hooks/useTickerList';
import Token from '../components/Token';

const styles = StyleSheet.create({
  appContainer: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    margin: 10,
  },
  headerContainer: {

  },
  badgeContainer: {
    flexDirection: 'row',
    flexGrow: 0,
    marginVertical: 5,
    paddingBottom: 10,
    minHeight: 50,
    borderStyle: 'solid',
  },
  sortContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  coinContainer: {
    flex: 1,
  },
  loadingContainer: {
    padding: 15,
  },
  loadingText: {
    textAlign: 'center',
  },
});

const Home = () => {
  const [searchKey, setSearchKey] = useState('');
  const [sortKey, setSortKey] = useState('default');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [prevTicker, setPrevTicker] = useState<ITicker[]>();

  const symbolList = useSymbolList();
  const tickerList = useTickerList(symbolList.isSuccess, symbolList.data?.data);

  useEffect(() => {
    if (tickerList !== undefined && tickerList.isSuccess) {
      setPrevTicker(tickerList.data);
    }
  }, [tickerList]);

  const combinedData = useMemo(() => {
    if (symbolList === undefined) {
      return [];
    }

    const symbols = symbolList.data?.data.map((item: ISymbol) => ({
      ...item,
    })) as ISymbol[];

    const tickers = tickerList !== undefined && tickerList.isSuccess === true
      ? tickerList.data?.map((item: ITicker) => ({
        ...item,
      })) as ITicker[] : null;

    const result = symbols?.map((item: ISymbol) => {
      const ticker = tickers !== null
        ? tickers?.filter((p) => p.symbol === item.symbol)[0]
        : prevTicker?.filter((p) => p.symbol === item.symbol)[0];
      return {
        ...item,
        price: ticker?.lastPrice,
        priceChangePercent: ticker?.priceChangePercent,
      };
    }) as IToken[];
    return result;
  }, [symbolList, tickerList]);

  if (combinedData !== undefined) {
    switch (sortKey) {
      case 'default':
        combinedData?.sort((a, b) => {
          if (a.rank === null) return (sortDirection === 'desc') ? 1 : -1; // Why this desc, because the rank start from number 1
          if (b.rank === null) return (sortDirection === 'desc') ? -1 : 1;
          return (sortDirection === 'desc') ? a.rank - b.rank : b.rank - a.rank;
        });
        break;
      case 'gainer':
        combinedData?.sort((a, b) => {
          if (a.priceChangePercent === null) return (sortDirection === 'asc') ? 1 : -1;
          if (b.priceChangePercent === null) return (sortDirection === 'asc') ? -1 : 1;
          return (sortDirection === 'asc') ? Number(a.priceChangePercent) - Number(b.priceChangePercent) : Number(b.priceChangePercent) - Number(a.priceChangePercent);
        });
        break;
      case 'price':
        combinedData?.sort((a, b) => {
          if (a.price === null) return (sortDirection === 'asc') ? 1 : -1;
          if (b.price === null) return (sortDirection === 'asc') ? -1 : 1;
          return (sortDirection === 'asc') ? a.price - b.price : b.price - a.price;
        });
        break;
      case 'volume':
        combinedData?.sort((a, b) => {
          if (a.volume === null) return (sortDirection === 'asc') ? 1 : -1;
          if (b.volume === null) return (sortDirection === 'asc') ? -1 : 1;
          return (sortDirection === 'asc') ? Number(a.volume) - Number(b.volume) : Number(b.volume) - Number(a.volume);
        });
        break;
      default:
        combinedData?.sort((a, b) => {
          if (a.rank === null) return (sortDirection === 'desc') ? 1 : -1;
          if (b.rank === null) return (sortDirection === 'desc') ? -1 : 1;
          return (sortDirection === 'desc') ? a.rank - b.rank : b.rank - a.rank;
        });
        break;
    }
  }

  const finalData = combinedData === undefined ? [] : combinedData?.filter((p) => {
    if (searchKey === '' && selectedBadge === '') return combinedData; // i < 100 | combinedData
    if (selectedBadge === '') return (p.name.toLowerCase().includes(searchKey.toLowerCase()) || p.fullName.toLowerCase().includes(searchKey.toLowerCase()));
    return (p.name.toLowerCase().includes(searchKey.toLowerCase())
      || p.fullName.toLowerCase().includes(searchKey.toLowerCase()))
      && p.tags.includes(selectedBadge);
  });

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <SearchBar value={searchKey} setSearchKey={setSearchKey} />
    </View>
  );

  const renderBadges = () => {
    const ListTag = TAGS as ITag[];
    return (
      <ScrollView horizontal style={styles.badgeContainer}>
        {ListTag.map((item: ITag) => (
          <Badge
            key={item.tag}
            tag={item.tag}
            text={item.name}
            icon={item.icon}
            setSelectedBadge={setSelectedBadge}
            color={(item.tag === selectedBadge) ? 'lightgray' : 'white'}
          />
        ))}
      </ScrollView>
    );
  };

  const renderSort = () => (
    <View style={styles.sortContainer}>
      <Text style={{ fontWeight: 'bold' }}>Sort By</Text>
      <View style={{ marginLeft: 'auto' }}>
        <ModalPicker
          data={SORT_OPTION}
          setSelectedKey={setSortKey}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </View>
    </View>
  );

  const renderTokens = () => (
    <FlashList
      data={finalData}
      renderItem={(item : { item:IToken }) => <Token key={item.item.name} data={item.item} />}
      keyExtractor={(item) => item.logo}
      estimatedItemSize={364}
    />
  );

  // const renderTokens = () => (
  //   <FlatList
  //     data={finalData}
  //     renderItem={(item : { item:IToken }) => <Token key={item.item.name} data={item.item} />}
  //     keyExtractor={(item) => item.logo}
  //     style={{ flexDirection: 'column' }}
  //   />
  // );

  // ScrollView is bad for rendering large list of data.
  // const renderTokens = () => (
  //   <ScrollView style={styles.coinContainer}>
  //     <TokenList tokens={finalData} />
  //   </ScrollView>
  // );

  const renderStatus = () => (
    symbolList.isLoading
      ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Loading...
          </Text>
        </View>
      )
      : symbolList.isError
    && (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>
        Error when fetching the API...
      </Text>
    </View>
    )
  );

  return (
    <SafeAreaView style={styles.appContainer}>
      {renderHeader()}
      {renderBadges()}
      {renderSort()}
      {renderStatus()}
      {renderTokens()}
    </SafeAreaView>
  );
};
export default Home;
