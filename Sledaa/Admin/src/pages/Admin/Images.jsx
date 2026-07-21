import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import AddNewAlbum from '../../components/common/Admin/AddNewAlbum';
import AreYouSure from '../../components/Popup/AreYouSure';

const Images = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAddImageOpen, setIsAddImageOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(-1);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
    
    const fetchAlbum = async () => {
        try {
            const token = localStorage.getItem('jwt_token');
            const response = await fetch(`http://localhost:8081/api/albums/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAlbum(data);
            }
        } catch (error) {
            console.error("Error fetching album", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (id) fetchAlbum();
    }, [id]);

    const slides = album && album.images ? album.images.map((img) => ({ src: `http://localhost:8081${img.imageUrl}` })) : [];

    const handleDeleteImage = (imageId) => {
        setImageToDelete(imageId);
        setDeleteConfirmOpen(true);
    };

    const executeDeleteImage = async () => {
        if (!imageToDelete) return;
        try {
            const token = localStorage.getItem('jwt_token');
            const response = await fetch(`http://localhost:8081/api/albums/images/${imageToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setDeleteConfirmOpen(false);
                setImageToDelete(null);
                fetchAlbum();
            } else {
                alert("Failed to delete image");
            }
        } catch (error) {
            console.error("Error deleting image", error);
            alert("Error deleting image");
        }
    };

    return (
        <Box
            sx={{
                padding: { xs: '16px', sm: '24px', md: '40px' },
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            {/* ── Header ──────────────────────────────────────── */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        fontSize: { xs: '18px', sm: '22px', md: '25px' },
                        lineHeight: '30px',
                        color: 'rgba(0, 0, 0, 1)',
                    }}
                >
                    GALLERY PAGE
                </Typography>

                {/* Add New Album Button (reused per specs) */}
                <Button
                    onClick={() => setIsAddImageOpen(true)}
                    sx={{
                        width: '159px',
                        height: '37px',
                        backgroundColor: 'rgba(0, 28, 166, 1)',
                        borderRadius: '9.98px',
                        padding: '7.98px 10.48px 7.98px 8.98px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4.99px',
                        color: '#ffffff',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: 'rgba(0, 20, 120, 1)' },
                    }}
                >
                    <AddIcon sx={{ width: '16px', height: '16px' }} />
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '13px',
                            color: '#fff',
                        }}
                    >
                        Add New Image
                    </Typography>
                </Button>
            </Box>

            {/* ── Album Label ─────────────────────────────────── */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-start' }}>
                <Box
                    sx={{
                        backgroundColor: 'rgba(0, 28, 166, 1)',
                        borderRadius: '15.85px',
                        padding: '12.68px 24px',
                        display: 'inline-block'
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 700,
                            fontSize: { xs: '16px', md: '20px' },
                            color: '#fff'
                        }}
                    >
                        {album ? album.title : 'Loading...'}
                    </Typography>
                </Box>
            </Box>

            {/* ── Masonry Grid ────────────────────────────────── */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box
                    sx={{
                        columnCount: { xs: 1, sm: 2, md: 3, lg: 4 },
                        columnGap: '16px',
                    }}
                >
                    {album?.images?.map((img, idx) => (
                        <Box
                            key={img.id}
                            sx={{
                                position: 'relative',
                                breakInside: 'avoid',
                                marginBottom: '16px',
                                borderRadius: '16px', // Matching layout radius
                                overflow: 'hidden',
                                cursor: 'pointer',
                            }}
                            onClick={() => setLightboxIndex(idx)}
                        >
                            <img
                                src={`http://localhost:8081${img.imageUrl}`}
                                alt={`${album.title} - ${idx}`}
                                style={{
                                    width: '100%',
                                    display: 'block',
                                }}
                            />

                            {/* Delete Icon Box */}
                            <Box
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteImage(img.id);
                                }}
                                sx={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    width: '29px',
                                    height: '30px',
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    borderRadius: '5px',
                                    padding: '3px 4px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                    }
                                }}
                            >
                                <DeleteOutlinedIcon
                                    sx={{
                                        width: '16px',
                                        height: '18px',
                                        color: 'rgba(0, 0, 0, 1)'
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}
                    {(!album?.images || album.images.length === 0) && (
                        <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
                            No images in this album.
                        </Typography>
                    )}
                </Box>
            )}

            {/* Add New Image Popup (Reusing the AddNewAlbum modal) */}
            <AddNewAlbum
                open={isAddImageOpen}
                onClose={() => {
                    setIsAddImageOpen(false);
                    fetchAlbum();
                }}
                isAddImageOnly={true}
                albumId={id}
            />

            <Lightbox
                index={lightboxIndex}
                slides={slides}
                open={lightboxIndex >= 0}
                close={() => setLightboxIndex(-1)}
                plugins={[Fullscreen, Download, Share, Zoom]}
            />

            <AreYouSure
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={executeDeleteImage}
            />
        </Box>
    );
};

export default Images;
