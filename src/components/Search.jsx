import React, { useState } from "react";
import search from '../assets/images';

function Search() {

    let dataArray;
    async function getUsers(){
        const res = await fetch('http://localhost:1337/api/articles?populate=*')
        const { results } = await res.json()
        dataArray = orderList(results)
        console.log(dataArray);
        creatUserList(dataArray)
    }
    getUsers()

    function orderList(data) {
        const orderedData = data.sort((a,b) => {
            if(a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
                return -1;
            }
            if(a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
                return 1;
            }
            return 0;
        })
        return orderedData;

    }

    function createdUserList(userList) {
        usersList.forEach(user = > {
            const listItem = document.createElement("div");
            listItem.setAttribute("class", "table-item");

            listItem.innerHTML = `
                <h2 className="post-title">{post.Title}</h2>
                <p className="text-gray-700">{post.Description}</p>
                <p className="text-sm text-gray-600">Auteur : {post.user?.username}</p>
            `
            searchResult.appendChild(listItem);
        })
    }

    searchInput.addEventListener("input", filterData)

    function filterData(e) {
        searchResult.innerHTML = ""
        const searchString = e.target.value.toLowerCase().replace(/\s/g, "");

        const filterArr = dataArray.filter(el => 
            el.name.first.toLowerCase().includes(searchString) || 
            el.name.last.toLowerCase().includes(searchSring) ||
            `${el.name.last + el.name.first}`.toLowerCase().replace(/\s/g, "").includes(searchedString); ||
            `${el.name.first + el.name.last}`.toLowerCase().replace(/\s/g, "").includes(searchedString);
        )

        createdUserList(filteredArr)
    }

    return (
        <div className="input-control">
            <label htmlFor="search">
                <img src={search} alt="Search Icon" />
            </label>
            <input id="search" type="text" placeholder="Search..." />
        </div>

        
    );
}

export default Search;
