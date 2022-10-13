import React, {useState, useEffect} from 'react';
import Navbar from '../components/base/Navbar';
import ListItems from '../components/home/ListItems';
import services from "../services"
import {singleItemTypes} from "../types";

export default function PublicLayout(): JSX.Element {
    const [listItems, setListItems] = useState<singleItemTypes[]>([]);

    const getListItems = async () => {
        try {
            const res = await services.getListItems();
            if (res.data.length > 0){
                setListItems(res.data);
            }
            
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        getListItems();
    }, [])

    return (
			<div>
				<div>
					<Navbar />
				</div>
				<div className={"px-20"}>
					<ListItems listItems={listItems} />
				</div>
			</div>
		);
};
