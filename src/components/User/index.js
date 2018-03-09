import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles'

const Employee = ({employee}) => {
    return (
        <View style={styles.employee}>
            <Image style={styles.cover}
                   source={{uri: employee.picture.large}}/>
            <View style={styles.info}>
                <Text style={styles.name}>
                    {`${employee.name.first.toUpperCase()} ${employee.name.last.toUpperCase()}`}
                </Text>
                <Text>
                    phone: {employee.cell}
                </Text>
                <Text>
                    {employee.email}
                </Text>
            </View>
        </View>
    )
};

export default Employee;