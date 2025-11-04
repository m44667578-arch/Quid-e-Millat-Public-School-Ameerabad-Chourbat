import React, { useState } from 'react';
import { GalleryItem } from '../../types';

export const galleryData: GalleryItem[] = [
    { id: 1, src: '/public/images/gallery/image/531413222_1300111814838252_1718877289359351421_n.jpg', caption: 'Our Picnic Day', mediaType: 'image' },
    { id: 2, src: '/public/images/gallery/image/532735596_1300111671504933_4672370864971746550_n.jpg', caption: 'Independence Day March', mediaType: 'image' },
    { id: 3, src: '/public/images/gallery/video/Facebook_3.mp4', caption: 'A short school video', mediaType: 'video',controls: 'controls' },
    { id: 4, src: '/public/images/gallery/image/sport week1.jpg', caption: 'Sportweek Cricket Match', mediaType: 'image' },
    { id: 5, src: '/public/images/gallery/image/533067687_1300111058171661_8786625976309702088_n.jpg', caption: 'Independance Day ', mediaType: 'image' },
    { id: 6, src: '/public/images/gallery/image/library2.jpg', caption: 'Library: A world of knowledge', mediaType: 'image' },
    { id: 7, src: '/public/images/others/art1.jpg', caption: 'Art and creativity on display', mediaType: 'image' },
    { id: 8, src: '/public/images/gallery/image/gallery.jpg', caption: 'School Glimpses', mediaType: 'image' },
    { id: 9, src: '/public/images/gallery/image/annual exam.jpg', caption: 'Annual Result Ceremony', mediaType: 'image' },
    { id: 10, src: '/public/images/gallery/image/fairwell party.jpg', caption: 'Farewell Party', mediaType: 'image' },
    { id: 11, src: '/public/images/gallery/image/library.jpg', caption: 'School Library Image', mediaType: 'image' },
    { id: 12, src: '/public/images/gallery/image/gallery5.jpg', caption: 'Students Enjoying ', mediaType: 'image' },
    { id: 13, src: '/public/images/gallery/image/sportweek4 babar house.jpg.jpg', caption: 'Baber House Members', mediaType: 'image' },
    { id: 14, src: '/public/images/gallery/image/library1.jpg', caption: 'Library ', mediaType: 'image' },
    { id: 15, src: '/public/images/gallery/image/resultday annual2.jpg', caption: 'Prize Distribution Ceremony', mediaType: 'image' },
    { id: 16, src: '/public/images/gallery/image/gallery1.jpg', caption: 'Nature', mediaType: 'image' },
    { id: 17, src: '/public/images/gallery/image/fairwell party1.jpg', caption: 'FareWell Party', mediaType: 'image' },
    { id: 18, src: '/public/images/gallery/image/annual exam3.jpg', caption: 'Result Day', mediaType: 'image' },
    { id: 19, src: '/public/images/gallery/image/library1.jpg', caption: 'School Library', mediaType: 'image' },
    { id: 20, src: '/public/images/gallery/image/sport week iqbal house.jpg', caption: 'Iqbal House Members', mediaType: 'image' },
    { id: 21, src: '/public/images/gallery/image/gallery2.jpg', caption: 'Autumn Season', mediaType: 'image' },
    { id: 22, src: '/public/images/gallery/image/annual exam1.jpg', caption: 'Annual Result Ceremony', mediaType: 'image' },
    { id: 23, src: '/public/images/gallery/image/studentcard distrubution.jpg', caption: 'StudentCard Distribution', mediaType: 'image' },
    { id: 24, src: '/public/images/gallery/image/sportweek3.jpg', caption: 'Sports Pic', mediaType: 'image' },
    { id: 25, src: '/public/images/gallery/image/sport week jinnah.jpg', caption: 'Jinnah House Members', mediaType: 'image' },
    { id: 26, src: '/public/images/gallery/image/gallery3.jpg', caption: 'Autumn Season', mediaType: 'image' },
    { id: 27, src: '/public/images/gallery/image/fairwell party2.jpg', caption: 'FareWell Party ', mediaType: 'image' },
    { id: 28, src: '/public/images/gallery/image/532805537_1300111771504923_61116209532873879_n.jpg', caption: 'School Glimpses', mediaType: 'image' },
    { id: 29, src: '/public/images/gallery/image/sportweek2.jpg', caption: 'Cricket Match', mediaType: 'image' },
    { id: 30, src: '/public/images/gallery/image/gallery4.jpg', caption: 'Autumn Season', mediaType: 'image' },
    { id: 31, src: '/public/images/gallery/image/library.jpg', caption: 'Our Library', mediaType: 'image' },
    { id: 32, src: '/public/images/gallery/image/gallery6.jpg', caption: 'Beauty of Autumn', mediaType: 'image' },
];

const MediaModal: React.FC<{ item: GalleryItem; onClose: () => void }> = ({ item, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white p-4 rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full relative" onClick={e => e.stopPropagation()}>
            {item.mediaType === 'video' ? (
                <video src={item.src} controls autoPlay className="w-full h-full object-contain max-h-[calc(90vh-80px)] bg-black" />
            ) : (
                <img src={item.src} alt={item.caption} className="w-full h-full object-contain max-h-[calc(90vh-80px)]" />
            )}
            <p className="text-center mt-4 text-lg text-gray-800">{item.caption}</p>
            <button onClick={onClose} className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 text-2xl leading-none">&times;</button>
        </div>
    </div>
);


const Gallery: React.FC<{ galleryItems: GalleryItem[] }> = ({ galleryItems }) => {
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    return (
        <div className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">
                        School Gallery
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        A visual journey through life at Quaid-e-Millat Public School.
                    </p>
                </div>
                {galleryItems.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryItems.map((item) => (
                            <div key={item.id} className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md" onClick={() => setSelectedItem(item)}>
                                {item.mediaType === 'video' ? (
                                    <video
                                        src={item.src}
                                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300 bg-black"
                                    />
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={item.caption}
                                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white text-sm font-semibold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">The gallery is currently empty. Please check back later for photos of our school events and activities.</p>
                )}
            </div>
            {selectedItem && <MediaModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </div>
    );
};

export default Gallery;