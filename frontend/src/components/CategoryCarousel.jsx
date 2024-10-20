import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    // "Frontend Developer",
    // "Backend Developer",
    // "Data Science",
    // "Graphic Designer",
    // "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="my-20">
            <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="flex justify-center md:basis-1/2 lg:basis-1/3">
                            <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full py-2 px-4">
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-gray-600" />
                <CarouselNext className="text-gray-600" />
            </Carousel>
        </div>
    );
}

export default CategoryCarousel;
