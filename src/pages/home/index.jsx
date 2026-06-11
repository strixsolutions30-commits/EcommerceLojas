import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Link 
} from '@mui/material';
import { CategoryBlocks } from "../../comp_home/categorias";
import { PopularProducts } from "../../comp_home/produtospopulares";
import Grade from "../../comp_home/grade";
import { Instagram } from '@mui/icons-material';

function Home({setCart}) {

    // const [posts, setPosts] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const instagramRef2 = useRef();
    // const instagramRef1 = useRef();

    // useEffect(() => {

    //     const script = document.createElement('script');
    //     script.src = "https://www.instagram.com/embed.js";
    //     script.async = true;
    //     document.body.appendChild(script);

    //     script.onload = () => {
    //         if (window.instgrm) {
    //             window.instgrm.Embeds.process();
    //         }
    //     };

    //     const fetchInstagramPosts = async () => {
    //         try {
    //             setTimeout(() => {
    //                 setPosts([
    //                     {
    //                         id: '1',
    //                         url: 'https://www.instagram.com/p/DRNtILfjaqn/?img_index=1',
    //                         title: 'Post 1 da TiccaStore'
    //                     },
    //                     {
    //                         id: '2',
    //                         url: 'https://www.instagram.com/p/DQJ09s8jVxr/?img_index=1',
    //                         title: 'Post 2 da TiccaStore'
    //                     },
    //                 ]);
    //                 setLoading(false);
    //             }, 1000);
    //         } catch (error) {
    //             console.error('Erro ao carregar posts:', error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchInstagramPosts();

    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);


    // useEffect(() => {
    //     if (!loading && window.instgrm) {
    //         setTimeout(() => {
    //             window.instgrm.Embeds.process();
    //         }, 100);
    //     }
    // }, [loading]);

    // if (loading) {
    //     return (
    //         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    //             <CircularProgress />
    //         </Box>
    //     );
    // }

    return (
            <Box>
                <Grade/>              
                <CategoryBlocks/>
                <PopularProducts/> 
            </Box>
        )
    }

export default Home;