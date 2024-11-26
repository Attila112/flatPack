<?php

namespace Tests\Unit\Services;

use App\Models\Property;
use App\Services\PropertyService;
use Illuminate\Http\Request;
use Mockery;
use PHPUnit\Framework\TestCase;

class PropertyServiceTest extends TestCase
{
    public function testGetAllProperties()
    {
        $propertiesMock = Mockery::mock('alias:App\Models\Property');
        $propertiesMock->shouldReceive('all')->once()->andReturn(collect([new Property(), new Property()]));

        $service = new PropertyService();
        $result = $service->getAll();

        $this->assertCount(2, $result);
    }

    public function testGetPropertyTypes()
    {
        $propertyMock = Mockery::mock('alias:App\Models\Property');

        $propertyMock->shouldReceive('distinct')->once()->andReturnSelf();
        $propertyMock->shouldReceive('get')->once()->andReturn(collect([
            (object) ['type' => 'Type1'],
            (object) ['type' => 'Type2']
        ]));

        $service = new PropertyService();
        $result = $service->getPropertyTypes();

        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        $this->assertEquals('Type1', $result[0]);
        $this->assertEquals('Type2', $result[1]);
    }

    public function testAddProperty()
    {
        $request = Mockery::mock(Request::class);
        $request->shouldReceive('input')->andReturn('test input');
        $request->shouldReceive('all')->andReturn([
            'title' => 'Test Title',
            'description' => 'Test Description',
            'size' => 100,
            'city' => 'Test City',
            'street' => 'Test Street',
            'house_number' => 1,
            'rooms' => 3,
            'bathroom_count' => 1,
            'floor' => 2,
            'building_material' => 'Brick',
            'type' => 'House',
            'plot_size' => 500,
            'garage' => true,
            'facing' => 'South',
            'price' => 200000
        ]);
        $request->shouldReceive('validate')->once();

        $propertyMock = Mockery::mock('alias:App\Models\Property');
        $propertyMock->shouldReceive('create')->once()->andReturn(new Property());

        $service = new PropertyService();
        $result = $service->add($request, 1);

        $this->assertInstanceOf(Property::class, $result);
    }
    public function testDeleteProperty()
    {
        $propertyMock = Mockery::mock('alias:App\Models\Property');
        $propertyMock->shouldReceive('where')->once()->with('id', 1)->andReturnSelf();
        $propertyMock->shouldReceive('delete')->once();

        $service = new PropertyService();
        $result = $service->delete(1);

        $this->assertNull($result);
    }

    public function testGetProperty()
    {
        $propertyMock = Mockery::mock('alias:App\Models\Property');
        $propertyMock->shouldReceive('where')->once()->with('id', 1)->andReturnSelf();
        $propertyMock->shouldReceive('first')->once()->andReturn(new Property());

        $service = new PropertyService();
        $result = $service->get(1);

        $this->assertInstanceOf(Property::class, $result);
    }

    public function testGetPropertiesByUserId()
    {
        $propertyMock = Mockery::mock('alias:App\Models\Property');
        $propertyMock->shouldReceive('where')->once()->with('user_id', 1)->andReturnSelf();
        $propertyMock->shouldReceive('get')->once()->andReturn(collect([new Property(), new Property()]));

        $service = new PropertyService();
        $result = $service->getPropertiesByUserId(1);

        $this->assertCount(2, $result);
    }

    protected function tearDown(): void
    {
        Mockery::close();
    }
}
