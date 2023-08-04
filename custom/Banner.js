import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

const BannerComponent = ({ bannerData }) => {
    return (
        <View style={styles.bannerContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {bannerData.map((item, index) => (
                    <TouchableOpacity
                        key={item._id}
                        onPress={() => alert(`You clicked on ${item.cds_bannerName}!`)}
                        style={[
                            styles.bannerItem,
                            { marginLeft: index === 0 ? 20 : 0 }, // Apply different margin to the first item
                        ]}
                    >
                        <FastImage
                            source={{ uri: item.cds_bannerImage }}
                            style={styles.bannerImage}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const CustomBanner = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchBannerData()
        
    }, []);

    const fetchBannerData = () => {
        const apiUrl = 'https://branding-profitable-de8df13d081b.herokuapp.com/cd_banner/cd_banner';

        // Make the GET request using Axios
        axios
            .get(apiUrl)
            .then(response => {
                // Handle the successful response
                setData(response.data.data); // Use response.data.data instead of response.data
                setLoading(false);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View>
            <BannerComponent bannerData={data} />
        </View>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bannerItem: {
        width: 320,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 20,
        overflow:'hidden'
    },
    bannerImage: {
        width: '100%',
        height: 120,
    },
    bannerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomBanner;