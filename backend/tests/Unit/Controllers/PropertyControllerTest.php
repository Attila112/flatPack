<?php

namespace Tests\Unit\Controllers;

use App\Http\Controllers\PropertyController;
use App\Services\PropertyService;
use Tests\TestCase;


class PropertyControllerTest extends TestCase
{
    protected $serviceMock;
    protected $controller;

    protected function setUp(): void
    {
        parent::setUp();
        $this->serviceMock = $this->createMock(PropertyService::class);
        $this->controller = new PropertyController();
        $this->controller->propertyService = $this->serviceMock;
    }

    public function testGetAllPropertiesSuccess()
    {
        $this->serviceMock->method('getAll')->willReturn([
            ['id' => 1, 'title' => 'Property 1'],
            ['id' => 2, 'title' => 'Property 2'],
        ]);

        $response = $this->controller->getAllProperties();
        $responseData = $response->getData(true);

        $this->assertTrue($responseData['success']);
        $this->assertCount(2, $responseData['properties']);
        $this->assertEquals(200, $response->status());
    }

    public function testDeletePropertySuccess()
    {
        $this->serviceMock->method('delete')->with(1)->willReturn(true);

        $response = $this->controller->deleteProperty(1);
        $responseData = $response->getData(true);

        $this->assertTrue($responseData['success']);
        $this->assertEquals(200, $response->status());
    }

    public function testGetPropertySuccess()
    {
        $property = ['id' => 1, 'title' => 'Test Property'];
        $this->serviceMock->method('get')->with(1)->willReturn($property);

        $response = $this->controller->getProperty(1);
        $responseData = $response->getData(true);

        $this->assertTrue($responseData['status']);
        $this->assertEquals(200, $response->status());
    }

    public function testGetPropertyNotFound()
    {
        $this->serviceMock->method('get')->with(1)->willReturn(null);

        $response = $this->controller->getProperty(1);
        $responseData = $response->getData(true);

        $this->assertFalse($responseData['success']);
        $this->assertEquals(404, $response->status());
    }

    public function testGetAllPropertiesToUserSuccess()
    {

        $properties = [
            ['id' => 1, 'title' => 'User Property'],
        ];

        $this->serviceMock->method('getPropertiesByUserId')->willReturn($properties);

        $response = $this->controller->getAllPropertiesToUser();
        $responseData = $response->getData(true);

        $this->assertTrue($responseData['success']);
        $this->assertEquals(200, $response->status());
    }
}
