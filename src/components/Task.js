import * as React from 'react';
import * as RN from 'react-native';
import { database } from '../../config/fb';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

export default function Task({
    id,
    emoji,
    name,
    completed,
}) {

    const onDelete = () => {
        const docRef = doc(database, 'tasks', id);
        deleteDoc(docRef);
    }

    const onEdit = () => {
        const docRef = doc(database, 'tasks', id);
        updateDoc(docRef, {
            completed: true,
        });
    }

    return (
        <RN.View>
            <RN.View style={styles.taskContainer}>
                <RN.View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <RN.Text style={styles.emoji}>{emoji}</RN.Text>
                    <AntDesign onPress={onDelete} name="delete" size={24} color="black" />
                </RN.View>
                <RN.Text style={styles.name}>{name}</RN.Text>
                {completed ? (
                    <RN.TouchableOpacity 
                    style={[styles.button, {backgroundColor: 'gray'}]}>
                    <RN.Text style={styles.buttonText}>Realizada</RN.Text>
                </RN.TouchableOpacity>
                )
                : (
                    <RN.TouchableOpacity 
                    onPress={onEdit}
                    style={styles.button}>
                    <RN.Text style={styles.buttonText}>Realizar</RN.Text>
                </RN.TouchableOpacity>
                )}
                
            </RN.View>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    taskContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
    },
    emoji: {
        fontSize: 100,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});
