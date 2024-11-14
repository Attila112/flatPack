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
            // $property = new Property([  'title' => "aaa",
            // 'user_id' => 1,
            // 'description' => "aa",
            // 'size' => 112,
            // 'city' => "aaaa",
            // 'street' => "aaaa",
            // 'house_number' => 12,
            // 'rooms' => 1,
            // 'bathroom_count' => 1,
            // 'floor' => 1,
            // 'building_material' => "aaaa",
            // 'type' => "aaa",
            // 'plot_size' => 12,
            // 'garage' => true,
            // 'facing' => "aa",
            // 'price' => 111111,
            // 'hasPicture' => false]);
            // $property->save();
            $properties = $this->propertyService->getAll();
            var_dump($properties);
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
           $properties = $properties->get();

          
            $numberOfGetProperties = 9;
            $pageNumber = ceil($properties->count() / $numberOfGetProperties);
            $properties->paginate($numberOfGetProperties);

            if($properties){
               return response()->json(['properties' => $properties, 'pageNumber' => $pageNumber]);
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

            // $id = \auth('sanctum')->id();

            $property =  $this->propertyService->add($request, 2);
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
                ],404);
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
