<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Services\PropertyService;
use Illuminate\Http\Request;
use PHPUnit\Util\Exception;

class PropertyController extends Controller
{
    protected PropertyService $propertyService;
    public function __construct()
    {
        $this->propertyService = new PropertyService();
    }

    public function getAllProperties()
    {
            $properties = $this->propertyService->getAll();
            if($properties){
                return response()->json([
                    'success' => true,
                    'properties' => $properties

                ],200);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'No properties found'
                ],404);
            }
    }

    public function searchProperty(Request $request)
    {

           $properties = $this->propertyService->search($request);

            $numberOfGetProperties = 9;
            $pageNumber = ceil($properties->count() / $numberOfGetProperties);
            $properties->paginate($numberOfGetProperties);

            if($properties){
               return response()->json(['properties' => $properties->get(), 'pageNumber' => $pageNumber]);
           }else{
               return response()->json([
                   'success' => false,
                   'message' => 'No properties found'
               ],404);
           }


    }


    public function getPropertyTypes()
    {


            $typesArray = $this->propertyService->getPropertyTypes();
                if($typesArray){
                    return response()->json($typesArray, 200);
                }else{
                    return response()->json([
                        'success' => false,
                        'message' => 'No property types found'
                    ],404);
                }


    }

    public function addProperty(Request $request)
    {

            $id = \auth('sanctum')->id();

            $property =  $this->propertyService->add($request, $id);
            if($property){
                return response()->json([
                    'status' => true,
                    'message' => 'Property added successfully',
                    'propertyId' => $property->id,
                    $property,
                ], 200);
            }
            else{
                return response()->json([
                    'success' => false,
                    'message' => 'Property not added'
                ],500);
            }
    }

    public function deleteProperty($id)
    {

//            $id = $request->id;
           $succes = $this->propertyService->delete($id);
            if($succes){
                return response()->json([
                    'success' => true,
                    'message' => 'Property deleted successfully'
                ],200);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Property not deleted'
                ],500);
            }


    }
    public function getProperty($id)
    {

            $property = $this->propertyService->get($id);
            if($property){
                return response()->json([
                    'property'=> $property,
                    'status' => true,
                    'message' => 'Property retrieved successfully',
                ], 200);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Property not found'
                ],404);
            }


    }
    public function getAllPropertiesToUser (Request $request){
        $id = \auth('sanctum')->id();
        $properties = $this->propertyService->getPropertiesByUserId($id);
        if($properties){
            return response()->json([
                'success' => true,
                'properties' => $properties
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'No properties found'
            ], 404);
        }

    }

//    public function getPropertiesNumber()
//    {
//        $properties = Property::all()->count();
////        $propertiesNumber = Property::->count();
////        var_dump($properties);
//        return response()->json($properties, 200);
//    }

}
