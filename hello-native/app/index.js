import {
	View,
	Text,
	TextInput,
	Button,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { Link } from "expo-router";

import { useEffect, useState } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";

const styles = StyleSheet.create({
	list: {
		borderWidth: 1,
		borderColor: "#ddd",
		margin: 15,
	},
	listItem: {
		flexDirection: "row",
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
		alignItems: "center",
	},
	itemText: {
		flexGrow: 1,
		fontSize: 18,
	},
	form: {
		margin: 15,
		flexDirection: "row",
	},
	input: {
		flexGrow: 1,
		paddingLeft: 10,
		backgroundColor: "#ddd",
		fontSize: 18,
	},
});

const api = "http://192.168.100.116:8888/tasks";

export default function App() {
	const [subject, setSubject] = useState("");
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await fetch(api);
			const data = await res.json();

			setTasks(data);
		})();
	}, []);

	const add = async () => {
		const res = await fetch(api, {
			method: "POST",
			body: JSON.stringify({ subject }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		setTasks([...tasks, data]);
		setSubject("");
	};

	const toggle = async _id => {
		await fetch(`${api}/toggle/${_id}`, {
            method: 'PUT',
        });

		setTasks(
			tasks.map(item => {
				if (item._id === _id) item.done = !item.done;
				return item;
			})
		);
	};

	return (
		<View>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					value={subject}
					onChangeText={setSubject}
				/>
				<Button
					title="ADD"
					onPress={add}
				/>
			</View>

			<View style={styles.list}>
				{tasks
					.filter(item => !item.done)
					.map(item => (
						<View
							style={styles.listItem}
							key={item._id}>
							<TouchableOpacity
								onPress={() => {
									toggle(item._id);
								}}>
								<FontAwesome
									name="check"
									style={{
										fontSize: 18,
										color: "#999",
										marginRight: 10,
									}}
								/>
							</TouchableOpacity>

							<Text style={styles.itemText}>{item.subject}</Text>

							<Link
								href={`/edit/${item._id}`}
								style={{ marginRight: 10 }}>
								<FontAwesome
									name="edit"
									style={{ fontSize: 18, color: "teal" }}
								/>
							</Link>

							<TouchableOpacity
								onPress={() => {
									setTasks(
										tasks.filter(task => {
											return task._id !== item._id;
										})
									);
								}}>
								<FontAwesome
									name="trash"
									style={{ fontSize: 18, color: "salmon" }}
								/>
							</TouchableOpacity>
						</View>
					))}
			</View>

			<View style={styles.list}>
				{tasks
					.filter(item => item.done)
					.map(item => (
						<View
							style={styles.listItem}
							key={item._id}>
							<TouchableOpacity
								onPress={() => {
									toggle(item._id);
								}}>
								<FontAwesome
									name="check"
									style={{
										fontSize: 18,
										color: "green",
										marginRight: 10,
									}}
								/>
							</TouchableOpacity>

							<Text style={[styles.itemText, { color: '#aaa' }]}>{item.subject}</Text>

							<Link
								href={`/edit/${item._id}`}
								style={{ marginRight: 10 }}>
								<FontAwesome
									name="edit"
									style={{ fontSize: 18, color: "teal" }}
								/>
							</Link>

							<TouchableOpacity
								onPress={() => {
									setTasks(
										tasks.filter(task => {
											return task._id !== item._id;
										})
									);
								}}>
								<FontAwesome
									name="trash"
									style={{ fontSize: 18, color: "salmon" }}
								/>
							</TouchableOpacity>
						</View>
					))}
			</View>
		</View>
	);
}
