import React, { useEffect, useMemo, useState } from "react";
import { Button, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { useQuery } from "react-query";
import AnimatedTextColor from "../components/AnimatedText";
import PillText from "../components/PillText";
import SearchBar from "../components/SearchBar";
import TokenList from "../components/TokenList";
import { API, REFETCH_INTERVAL, TAGS } from "../constants";
import { IFinalData, ISymbol, ITag, ITicker } from "../interfaces";

const getSymbolList = async () => (await fetch(API.symbolList)).json();
const getTickerList = async () => (await fetch(API.ticker)).json();

const Home = () => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedPill, setSelectedPill] = useState('');

  const symbolList = useQuery('symbolList', getSymbolList);
  const tickerList = useQuery('tickerList', getTickerList, {
    refetchInterval: REFETCH_INTERVAL,
  });
  const combinedData = useMemo(() => {
    if (symbolList === undefined && tickerList === undefined) {
      return [];
    }

    const symbols = symbolList.data?.data.map((item: ISymbol) => ({
      symbol: item.symbol,
      name: item.name,
      fullName: item.fullName,
      logo: item.logo,
      price: item.price,
      volume: item.volume,
      rank: item.rank,
      tags: item.tags,
    })) as ISymbol[];

    const tickers = tickerList.data?.map((item: ITicker) => ({
      symbol: item.symbol,
      priceChange: item.priceChange,
      priceChangePercent: item.priceChangePercent,
      lastPrice: item.lastPrice,
      volume: item.volume,
      highPrice: item.highPrice,
      lowPrice: item.lowPrice,
    })) as ITicker[];

    const result = symbols?.map((item: ISymbol) => {
      const ticker = tickers?.filter((p) => p.symbol === item.symbol)[0];
      return {
        symbol: item.symbol,
        name: item.name,
        fullName: item.fullName,
        logo: item.logo,
        price: ticker?.lastPrice,
        volume: item.volume,
        rank: item.rank,
        tags: item.tags,
        priceChangePercent: ticker?.priceChangePercent,
        highPrice: ticker?.highPrice,
        lowPrice: ticker?.lowPrice,
      };
    }) as IFinalData[];
    return result;
  }, [symbolList, tickerList]);

  if (combinedData !== undefined) {
    combinedData?.sort((a, b) => {
      if (a.rank === null) return 1;
      if (b.rank === null) return -1;
      return a.rank < b.rank ? -1 : 1;
    });
  }

  const finalData = combinedData === undefined ? [] : combinedData?.filter((p) => {
    if (searchKey === '' && selectedPill === '') return combinedData;
    if (selectedPill === '') return (p.name.toLowerCase().includes(searchKey.toLowerCase()) || p.fullName.toLowerCase().includes(searchKey.toLowerCase()));
    return (p.name.toLowerCase().includes(searchKey.toLowerCase())
      || p.fullName.toLowerCase().includes(searchKey.toLowerCase()))
      && p.tags.includes(selectedPill);
  });

  const renderHeader = () => {
    return (
      <View style={styles.appContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 32 }}>Market</Text>
        <View style={{ marginLeft: "auto" }}>
          <TextInput style={{width: 200, borderWidth: 1, borderRadius: 8, paddingLeft: 10}} placeholder={"Test"} value={"Test"}/>
        </View>
      </View>
    );
  }

  const renderPillList = () => {
    return (
      <ScrollView horizontal={true} style={styles.pillContainer}>
        {TAGS.map((item: ITag) => {
          return (
            <PillText key={item.tag} tag={item.tag} text={item.name} setSelectedPill={setSelectedPill} />
          )
        })}
      </ScrollView>
    );
  };

  const renderSort = () => {
    return (
      <View style={styles.sortContainer}>
        <Text>Sort By</Text>
        <Text style={{ marginLeft: "auto" }}>Default</Text>
      </View>
    );
  };

  const renderCoinList = () => {
    return (
      <ScrollView style={styles.coinContainer}>
        <TokenList tokens={finalData} />
      </ScrollView>
    );
  };

  const renderHome = () => {
    return (
      <>
        {/* {renderHeader()} */}
        <SearchBar></SearchBar>
        {renderPillList()}
        {renderSort()}
        {renderCoinList()}
      </>
    )
  }

  return (
    <SafeAreaView style={styles.header}>
      {renderHome()}
    </SafeAreaView>
  );
}
export default Home;


const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 15,
    flex: 1,
  },
  appContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  pillContainer: {
    maxHeight: 50,
    flexDirection: "row",
    marginVertical: 10,
    borderStyle: "solid",
    flexGrow: 0
  },
  sortContainer: {
    flexDirection: "row",
  },
  coinContainer: {
    flex: 1,
  },
});
