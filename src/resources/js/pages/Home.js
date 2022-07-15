
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MainTable from '../components/MainTable';
import PostForm from '../components/PostForm';

//スタイルの定義
const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

//ヘッダーのコンテンツ用の配列定義
const headerList = ['名前', 'タスク内容', '編集', '完了'];


function Home() {
    //定義したスタイルを利用するための設定
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({name:'', content:''});

    useEffect(() => {
        getPostsData();
    },[]);
    const getPostsData = () => {
        axios
        .get('/api/posts')
        .then(response => {
            setPosts(response.data);
            console.log(response.data);
        })
        .catch(() => {
            console.log('通信に失敗しました');
        })
    }

    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let data = Object.assign({}, formData);
        setFormData(data);
    }

    const createPost = async() => {
        if(formData == ''){
            return;
        }

        await axios
            .post('/api/posts/create', {
                name: formData.name,
                content: formData.content
            })
            .then((res) => {
                const newPosts = [...posts];
                newPosts.push(res.data);
                setPosts(newPosts);
                setFormData({name:'', content:''});
            })
            .catch(error => {
                console.log(error);
            });
    }

    // createPostの下に記載
    const deletePost = async (post) => {
        await axios
            .post('/api/delete', {
            id: post.id
        })
        .then((res) => {
            // console.log()
            this.setState({
                posts: res.posts
            });

        })
        .catch(error => {
            console.log(error);
        });
    }
    let rows = [];

    posts.map((post) => 
        rows.push({
            name: post.name,
            content: post.content,
            editBtn: <Button color="secondary" variant="contained" key={post.id} href={`/post/edit/${post.id}`}>編集</Button>,
            deleteBtn: <Button color="primary" variant="contained" onClick={() => deletePost(post)}>完了</Button>,
        })
    );

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <h1>タスク管理</h1>
                        <Card className={classes.card}>
                            <PostForm data={formData} btnFunc={createPost} inputChange={inputChange} />
                        </Card>
                        <Card className={classes.card}>
                            <MainTable headerList={headerList} rows={rows} />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
